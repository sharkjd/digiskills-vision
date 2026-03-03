"use client";

import { motion } from "framer-motion";

export function EmpatieTextContent() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--tv-border)",
        marginTop: 16,
      }}
    >
      <div style={{ padding: "20px 0 0" }}>
        <article
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--tv-text-main)",
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            Empatie není vrozená vlastnost, ale dovednost, kterou lze systematicky
            rozvíjet. Klíčem je vědomá pozornost k druhým a ochota vnímat svět
            jejich očima. Níže najdete několik praktických tipů, jak kultivovat
            empatii v každodenním vedení.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--tv-text-main)",
            }}
          >
            1. Aktivní naslouchání
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            Při rozhovoru se plně soustřeďte na druhou osobu. Odložte telefon,
            udržujte oční kontakt a nechte druhého domluvit bez přerušování.
            Ptejte se na doplňující otázky – ukážete tím zájem a pochopení.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--tv-text-main)",
            }}
          >
            2. Pravidelná reflexe
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            Každý večer si zkuste odpovědět na otázku: „Jak se dnes cítil ten
            člověk, se kterým jsem mluvil?“ Tato krátká reflexe vám pomůže
            vnímat emoce druhých a lépe na ně reagovat.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--tv-text-main)",
            }}
          >
            3. Respekt k odlišným perspektivám
          </h4>
          <p style={{ margin: "0 0 16px" }}>
            Ne každý vidí situaci stejně jako vy. Zkuste se před důležitým
            rozhodnutím ptát: „Jak by to vnímal někdo s jinou zkušeností?“ Tím
            rozšíříte svůj úhel pohledu a posílíte empatické vedení.
          </p>

          <h4
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: "24px 0 8px",
              color: "var(--tv-text-main)",
            }}
          >
            4. Malé gesto má velký význam
          </h4>
          <p style={{ margin: 0 }}>
            Empatie se projevuje i v drobnostech – poděkování, uznání úspěchu,
            nabídka pomoci. Tyto malé kroky budují důvěru a vytvářejí prostředí,
            kde se lidé cítí v bezpečí a respektováni.
          </p>
        </article>
      </div>
    </motion.div>
  );
}
