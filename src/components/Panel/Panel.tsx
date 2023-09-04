import "./Panel.css";

interface PanelProps {
  deeds: {
    name: string;
    checked: boolean;
    id: string;
  }[];
  setShowDeeds: React.Dispatch<React.SetStateAction<string>>;
  showDeeds: string;
  setDeeds: (
    updatedDeeds: {
      name: string;
      checked: boolean;
      id: string;
    }[]
  ) => void;
}

function Panel({ deeds, setShowDeeds, showDeeds, setDeeds }: PanelProps) {
  const deedsLeft = deeds.filter((deed) => deed.checked === false);

  return (
    <div className="panel">
      <p className="panel__info-text">
        {deedsLeft.length === 0
          ? "Активных задач нет"
          : deedsLeft.length === 1
          ? `${deedsLeft.length} активная задача`
          : deedsLeft.length <= 4
          ? `${deedsLeft.length} активные задачи`
          : `${deedsLeft.length} активных задач`}
      </p>
      <div className="panel__sort-container">
        <button
          onClick={() => setShowDeeds("all")}
          className={`panel__button ${
            showDeeds === "all" ? "panel__button_active" : ""
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setShowDeeds("active")}
          className={`panel__button ${
            showDeeds === "active" ? "panel__button_active" : ""
          }`}
        >
          Активные
        </button>
        <button
          onClick={() => setShowDeeds("completed")}
          className={`panel__button ${
            showDeeds === "completed" ? "panel__button_active" : ""
          }`}
        >
          Завершенные
        </button>
      </div>
      <button onClick={() => setDeeds(deedsLeft)} className="panel__button">
        Очистить завершенные
      </button>
    </div>
  );
}

export default Panel;
