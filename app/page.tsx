"use client";

import { useState } from "react";
import { i18n, languages, Lang } from "./i18n";

type DateValue = { mm: string; dd: string; yyyy: string };

export default function GuestListForm() {
  const [lang, setLang] = useState<Lang>("en");
  const [submitted, setSubmitted] = useState(false);

  const [arrival, setArrival] = useState<DateValue>({ mm: "", dd: "", yyyy: "" });
  const [departure, setDeparture] = useState<DateValue>({ mm: "", dd: "", yyyy: "" });
  const [prevStop, setPrevStop] = useState("");
  const [nextPlace, setNextPlace] = useState("");

  const t = i18n[lang];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClear() {
    setArrival({ mm: "", dd: "", yyyy: "" });
    setDeparture({ mm: "", dd: "", yyyy: "" });
    setPrevStop("");
    setNextPlace("");
  }

  return (
    <div className="page">
      <div className="container">
        <div className="langTabs">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={l.code === lang ? "active" : ""}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="headerCard">
          <h1>{t.title}</h1>
          <p className="desc">{t.company}</p>
        </div>

        {!submitted && <p className="requiredNote">{t.requiredNote}</p>}

        {!submitted && (
          <form onSubmit={handleSubmit}>
            <DateField
              label={t.arrival}
              value={arrival}
              onChange={setArrival}
            />
            <DateField
              label={t.departure}
              value={departure}
              onChange={setDeparture}
            />

            <div className="fieldCard">
              <label>
                {t.prevStop}
                <span className="req"> *</span>
              </label>
              <input
                className="textInput"
                type="text"
                placeholder={t.yourAnswer}
                value={prevStop}
                onChange={(e) => setPrevStop(e.target.value)}
                required
              />
            </div>

            <div className="fieldCard">
              <label>
                {t.nextPlace}
                <span className="req"> *</span>
              </label>
              <input
                className="textInput"
                type="text"
                placeholder={t.yourAnswer}
                value={nextPlace}
                onChange={(e) => setNextPlace(e.target.value)}
                required
              />
            </div>

            <div className="actions">
              <button type="submit" className="submitBtn">
                {t.next}
              </button>
              <button type="button" className="clearLink" onClick={handleClear}>
                {t.clear}
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="confirm">
            <h2>{t.thanksTitle}</h2>
            <p>{t.thanksBody}</p>
          </div>
        )}

        <p className="footer">
          {t.footnote}
          <br />
          <br />
          <span className="brand">{t.createdBy}</span>
        </p>
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: DateValue;
  onChange: (v: DateValue) => void;
}) {
  return (
    <div className="fieldCard">
      <label>
        {label}
        <span className="req"> *</span>
      </label>
      <div className="dateRow">
        <div className="dateGroup mm">
          <span>MM</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={value.mm}
            onChange={(e) => onChange({ ...value, mm: e.target.value })}
            required
          />
        </div>
        <div className="dateGroup dd">
          <span>DD</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={value.dd}
            onChange={(e) => onChange({ ...value, dd: e.target.value })}
            required
          />
        </div>
        <div className="dateGroup yyyy">
          <span>YYYY</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={value.yyyy}
            onChange={(e) => onChange({ ...value, yyyy: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
}
