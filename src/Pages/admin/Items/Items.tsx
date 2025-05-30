import { useEffect, useState } from "react";
import styles from "./Items.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../widgets/Loader/Loader";
import { BiImage } from "react-icons/bi";

export const AdminItems = () => {
  const [article, setArticle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("0");
  const [loading, setLoading] = useState(true);
  const [creatingType, setCreatingType] = useState("0");
  const [data, setData] = useState([]);
  const [files, setFiles] = useState<string[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const [editing, setEditing] = useState<any>();

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/categories`)
      .then((res) => setCategories(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg));

    console.log(creatingType);
  }, []);

  const refresh = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (article) query.append("article", article);
    if (type) query.append("type", type);

    const url = `${
      import.meta.env.VITE_APP_API_URL
    }/products?${query.toString()}`;

    axios
      .get(url)
      .then((res) => setData(res.data.innerData))
      .catch((err) => toast.error(err.response?.data?.msg || "Error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(() => refresh(), 500);
    return () => clearTimeout(timeout);
  }, [article]);

  return (
    <div className={styles.items}>
      {loading && <Loader />}
      <div className={styles.items_top}>
        <h1>Товары</h1>
        <section>
          <input
            type="text"
            name="article"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Артикул"
          />
          <select
            name="type"
            id=""
            onChange={(e) => {
              setType(e.target.value);
              setLoading(true);
              const query = new URLSearchParams();
              if (article) query.append("article", article);
              query.append("type", e.target.value);

              const url = `${
                import.meta.env.VITE_APP_API_URL
              }/products?${query.toString()}`;

              axios
                .get(url)
                .then((res) => setData(res.data.innerData))
                .catch((err) => toast.error(err.response?.data?.msg || "Error"))
                .finally(() => setLoading(false));
            }}
          >
            <option value="0">Ткани</option>
            <option value="1">КПБ</option>
          </select>
          <button onClick={() => setIsOpen(true)}>
            + Добавить новый товар
          </button>
        </section>
      </div>
      <div className={styles.items_list}>
        {data.map((item: any, index: number) => (
          <div
            onClick={() => {
              setCreatingType(item.type);
              setEditing(item);
              setFiles(item.img);
            }}
            key={index}
            className={styles.items_list_item}
          >
            <img src={item.img[0]} alt={item.name} />
            <p>Артикул: {item.article}</p>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setIsOpen(false);
                setFiles([]);
              }}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => {
                setLoading(true);
                const data = new FormData(e.target as HTMLFormElement);
                const value = Object.fromEntries(data);

                e.preventDefault();
                axios(`${import.meta.env.VITE_APP_API_URL}/products/create`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  data: { ...value, img: files },
                })
                  .then((res) => {
                    toast.success(res.data.msg);
                    refresh();
                  })
                  .catch((err) => toast.error(err.response.data.msg))
                  .finally(() => setLoading(false));
              }}
            >
              <h1>Создать новый товар</h1>
              <label>
                <p>Название</p>
                <input type="text" name="name" />
              </label>
              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section
                  style={{ flexDirection: files.length ? "row" : "column" }}
                >
                  {files.length ? (
                    files.map((i) => <img src={i} alt="" />)
                  ) : (
                    <>
                      <BiImage />
                      Нажмите, для выбора фото
                    </>
                  )}
                </section>
                <input
                  style={{ appearance: "none", display: "none" }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) return;

                    const toBase64 = (file: File): Promise<string> =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = (error) => reject(error);
                      });

                    const base64Files: string[] = [];

                    for (const file of Array.from(files)) {
                      try {
                        const base64 = await toBase64(file);
                        base64Files.push(base64);
                      } catch (err) {
                        console.error("Ошибка при преобразовании файла:", err);
                      }
                    }

                    setFiles(base64Files);
                  }}
                />
              </label>
              <label>
                <p>Тип товара</p>
                <select
                  onChange={(e) => setCreatingType(e.target.value)}
                  name="type"
                >
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>
              <label>
                <p>Категория</p>
                {creatingType == "0" ? (
                  <select name="categoryId" id="">
                    {categories
                      ?.filter((item: any) => item.applies_to == "0")
                      ?.map((item: any) => (
                        <option value={item.categoryId}>{item.name}</option>
                      ))}
                  </select>
                ) : (
                  <select name="categoryId" id="">
                    {categories
                      ?.filter((item: any) => item.applies_to == "1")
                      ?.map((item: any) => (
                        <option value={item.categoryId}>{item.name}</option>
                      ))}
                  </select>
                )}
              </label>
              {creatingType == "0" && (
                <label>
                  <p>Ширина ткани</p>
                  <input type="text" name="width" />
                </label>
              )}
              {creatingType == "0" && (
                <label>
                  <p>Граммовка</p>
                  <input type="text" name="weight" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Размер постели</p>
                  <input type="text" name="size" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Кол-во наволочек </p>
                  <input type="text" name="pillowcases" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Размер наволочки </p>
                  <input type="text" name="pillowcaseSize" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Размер простыни </p>
                  <input type="text" name="bedsheetSize" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Размер пододеяльника </p>
                  <input type="text" name="duvetCoverSize" />
                </label>
              )}
              {creatingType == "1" && (
                <label>
                  <p>Страна производитель </p>
                  <input type="text" name="madein" />
                </label>
              )}
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}
      {editing && (
        <div className={styles.modal}>
          <div className={styles.modal_body}>
            <button
              onClick={() => {
                setEditing(false);
                setFiles([]);
              }}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => {
                setLoading(true);
                const data = new FormData(e.target as HTMLFormElement);
                const value = Object.fromEntries(data);

                e.preventDefault();
                axios(
                  `${import.meta.env.VITE_APP_API_URL}/products/update/${
                    editing._id
                  }`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                    data: { ...value, img: files },
                  }
                )
                  .then((res) => {
                    toast.success(res.data.msg);
                    refresh();
                  })
                  .catch((err) => toast.error(err.response.data.msg))
                  .finally(() => setLoading(false));
              }}
            >
              <h1>Редактирование товара</h1>
              <label>
                <p>Название</p>
                <input
                  required
                  defaultValue={editing.name}
                  type="text"
                  name="name"
                />
              </label>
              <label className={styles.modal_photoLabel}>
                <p>Фото</p>
                <section
                  style={{ flexDirection: files.length ? "row" : "column" }}
                >
                  {files.length ? (
                    files.map((i) => <img src={i} alt="" />)
                  ) : (
                    <>
                      <BiImage />
                      Нажмите, для выбора фото
                    </>
                  )}
                </section>
                <input
                  style={{ appearance: "none", display: "none" }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) return;

                    const toBase64 = (file: File): Promise<string> =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = (error) => reject(error);
                      });

                    const base64Files: string[] = [];

                    for (const file of Array.from(files)) {
                      try {
                        const base64 = await toBase64(file);
                        base64Files.push(base64);
                      } catch (err) {
                        console.error("Ошибка при преобразовании файла:", err);
                      }
                    }

                    setFiles(base64Files);
                  }}
                />
              </label>
              <label>
                <p>Тип товара</p>
                <select
                  onChange={(e) => setCreatingType(e.target.value)}
                  value={creatingType}
                  name="type"
                >
                  <option value={0}>Ткань</option>
                  <option value={1}>КПБ</option>
                </select>
              </label>
              <label>
                <p>Категория</p>
                {creatingType == "0" ? (
                  <select
                    defaultValue={editing.categoryId}
                    name="categoryId"
                    id=""
                  >
                    {categories
                      ?.filter((item: any) => item.applies_to == "0")
                      ?.map((item: any) => (
                        <option value={item.categoryId}>{item.name}</option>
                      ))}
                  </select>
                ) : (
                  <select
                    defaultValue={editing.applies_to}
                    name="categoryId"
                    id=""
                  >
                    {categories
                      ?.filter((item: any) => item.applies_to == "1")
                      ?.map((item: any) => (
                        <option value={item.categoryId}>{item.name}</option>
                      ))}
                  </select>
                )}
              </label>
              {creatingType == "0" && (
                <>
                  <label>
                    <p>Ширина ткани</p>
                    <input
                      required
                      type="text"
                      name="width"
                      defaultValue={editing.width}
                    />
                  </label>

                  <label>
                    <p>Граммовка</p>
                    <input
                      required
                      type="text"
                      name="weight"
                      defaultValue={editing.weight}
                    />
                  </label>
                </>
              )}
              {creatingType == "1" && (
                <>
                  <label>
                    <p>Размер постели</p>
                    <input
                      required
                      type="text"
                      name="size"
                      defaultValue={editing.size}
                    />
                  </label>

                  <label>
                    <p>Кол-во наволочек </p>
                    <input
                      required
                      type="text"
                      name="pillowcases"
                      defaultValue={editing.pillowcases}
                    />
                  </label>

                  <label>
                    <p>Размер наволочки </p>
                    <input
                      required
                      type="text"
                      name="pillowcaseSize"
                      defaultValue={editing.pillowcaseSize}
                    />
                  </label>

                  <label>
                    <p>Размер простыни </p>
                    <input
                      required
                      type="text"
                      name="bedsheetSize"
                      defaultValue={editing.bedsheetSize}
                    />
                  </label>
                  <label>
                    <p>Размер пододеяльника </p>
                    <input
                      required
                      type="text"
                      name="duvetCoverSize"
                      defaultValue={editing.duvetCoverSize}
                    />
                  </label>
                  <label>
                    <p>Страна производитель </p>
                    <input
                      required
                      type="text"
                      name="madein"
                      defaultValue={editing.madein}
                    />
                  </label>
                </>
              )}
              <section>
                <button
                  type="button"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Вы уверены, что хотите удалить этот товаp?"
                    );

                    if (!confirm) return;

                    setLoading(true);
                    axios(
                      `${import.meta.env.VITE_APP_API_URL}/products/delete/${
                        editing._id
                      }`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                      .then((res) => {
                        toast.success(res.data.msg);
                        setFiles([]);
                        refresh();
                        setEditing(false);
                      })
                      .catch((err) => toast.error(err.response.data.msg))
                      .finally(() => setLoading(false));
                  }}
                >
                  Удалить
                </button>
                <button type="submit">Отправить</button>
              </section>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
