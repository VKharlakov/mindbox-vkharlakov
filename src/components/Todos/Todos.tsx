import "./Todos.css";
import Deed from "../Deed/Deed";
import Panel from "../Panel/Panel";
import { uniqueId } from "../../utils/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

function Todos() {
  const [formValue, setFormValue] = useState({ name: "" });
  const [deeds, setDeeds] = useState<
    {
      name: string;
      checked: boolean;
      id: string;
    }[]
  >([]);
  const [showDeeds, setShowDeeds] = useState<string>("all");
  const deedsActive = deeds.filter((deed) => deed.checked === false);
  const deedsCompleted = deeds.filter((deed) => deed.checked === true);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(true);

  //   Handle add new todo
  function handleAddTodo(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setIsFormValid(true);
    setFormValue({
      ...formValue,
      [name]: value.trim().charAt(0).toUpperCase() + value.slice(1),
    });
  }

  //   Handle submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formValue.name === "") {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    setDeeds([
      { name: formValue.name, checked: false, id: uniqueId() },
      ...deeds,
    ]);
    setFormValue({ name: "" });
  }

  //   Handle check/uncheck a deed
  function handleCheck(e: ChangeEvent<HTMLInputElement>, id: string) {
    const isChecked = e.target.checked;

    const updatedDeeds = deeds.map((deed) =>
      deed.id === id ? { ...deed, checked: isChecked } : deed
    );

    setDeeds(updatedDeeds);
  }

  //   Remove "error class after 1s"
  useEffect(() => {
    if (isFormValid === false) {
      setTimeout(() => setIsFormValid(true), 1000);
    }
  }, [isFormValid]);

  return (
    <div className="todos">
      <span className="todos__pin" />
      <h1 className="todos__title">todos</h1>
      <div className="todos__form-wrapper">
        <form
          className="todos__form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          role="form"
        >
          <input
            onChange={(e) => handleAddTodo(e)}
            value={formValue.name}
            className={`todos__input ${
              isFormValid === true ? "" : "todos__input_error"
            }`}
            type="text"
            name="name"
            placeholder="Что предстоит сделать?"
            autoComplete="off"
            required
          />
          <div className="todos__deeds-wrapper">
            {deeds.length === 0 && (
              <p className="todos__placeholder">
                Здесь будут появляться Ваши задачи
              </p>
            )}
            {/* Show all deeds */}
            {showDeeds === "all" &&
              deeds.length > 0 &&
              deeds.map((deed) => (
                <Deed key={deed.id} deed={deed} handleCheck={handleCheck} />
              ))}
            {/* Show only active deeds */}
            {showDeeds === "active" &&
              (deedsActive.length > 0
                ? deedsActive.map((deed) => (
                    <Deed key={deed.id} deed={deed} handleCheck={handleCheck} />
                  ))
                : deeds.length !== 0 && (
                    <p className="todos__placeholder">
                      У Вас нет активных задач
                    </p>
                  ))}
            {/* Show only completed deeds */}
            {showDeeds === "completed" &&
              (deedsCompleted.length > 0
                ? deedsCompleted.map((deed) => (
                    <Deed key={deed.id} deed={deed} handleCheck={handleCheck} />
                  ))
                : deeds.length !== 0 && (
                    <p className="todos__placeholder">
                      У Вас нет выполненных задач
                    </p>
                  ))}
          </div>
        </form>
        <Panel
          deeds={deeds}
          setShowDeeds={setShowDeeds}
          showDeeds={showDeeds}
          setDeeds={setDeeds}
        />
      </div>
      <span className="todos__ui"></span>
      <span className="todos__ui"></span>
      <span className="todos__ui"></span>
    </div>
  );
}

export default Todos;
