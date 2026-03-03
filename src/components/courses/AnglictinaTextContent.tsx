"use client";

import { motion } from "framer-motion";

export function AnglictinaTextContent() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--jipka-border)",
        marginTop: 16,
      }}
    >
      <div style={{ padding: "20px 0 0" }}>
        <article
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--jipka-text-main)",
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            Efektivní učení angličtiny vyžaduje strategii a pravidelnost. Níže
            najdete několik osvědčených tipů, které vám pomohou zlepšit se
            rychleji a trvaleji.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--jipka-text-main)",
            }}
          >
            1. Denní kontakt s jazykem
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            I 15 minut denně má větší efekt než dvě hodiny jednou týdně. Poslechněte
            si podcast cestou do práce, přečtěte článek v angličtině nebo si
            pusťte seriál s anglickými titulky.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--jipka-text-main)",
            }}
          >
            2. Aktivní vs. pasivní učení
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            Pasivní poslech je dobrý doplněk, ale aktivní produkce jazyka –
            mluvení, psaní, cvičení – vede k rychlejšímu pokroku. Zkuste si
            nahlas popisovat, co děláte, nebo vést deník v angličtině.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--jipka-text-main)",
            }}
          >
            3. Kontextové učení slovíček
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            Učte se slovní zásobu ve větách a kontextech, ne izolovaně. Když
            narazíte na nové slovo, zapište si celou větu – lépe si ho
            zapamatujete a budete vědět, jak ho použít.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--jipka-text-main)",
            }}
          >
            4. Chyby jsou součást učení
          </h4>
          <p style={{ margin: 0 }}>
            Nebojte se mluvit, i když děláte chyby. Komunikace je prioritou –
            gramatická dokonalost přijde s praxí. Každá chyba je příležitost
            se něco naučit.
          </p>
        </article>
      </div>
    </motion.div>
  );
}
