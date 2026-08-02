import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR).",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/privacy/",
  },
};

const LAST_UPDATED = "2 agosto 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← Torna al sito
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Informativa sul trattamento dei dati personali
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Ultimo aggiornamento: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 text-slate-700 [&_h2]:mt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:leading-relaxed [&_a]:text-blue-600 [&_a]:hover:underline">
          <section>
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento è <strong>Alessio Bernardini</strong>,
              libero professionista con P.IVA 02607070444, con sede a Ascoli
              Piceno (AP), Italia. Per qualunque richiesta relativa al
              trattamento dei dati personali è possibile scrivere a{" "}
              <a href="mailto:alebernardini95@gmail.com">
                alebernardini95@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2>2. Quali dati raccogliamo e da dove provengono</h2>
            <p>
              A seconda del contesto, i dati personali trattati provengono da
              fonti diverse:
            </p>
            <ul>
              <li>
                <strong>Dati forniti direttamente dall&apos;interessato</strong> —
                nome, email, telefono, azienda ed eventuale messaggio, quando
                si compila un modulo di contatto su questo sito o si richiede
                un preventivo.
              </li>
              <li>
                <strong>
                  Dati di aziende raccolti a fini di prospezione commerciale
                  (B2B)
                </strong>{" "}
                — ragione sociale, indirizzo, numero di telefono, sito web
                aziendale, valutazioni pubbliche e, quando reperibile, un
                indirizzo email aziendale generico (es. &ldquo;info@&rdquo;,
                &ldquo;contatti@&rdquo;). Questi dati provengono da{" "}
                <strong>Google Places</strong> (informazioni pubbliche su
                attività commerciali) e dalla{" "}
                <strong>
                  lettura automatizzata di pagine pubbliche del sito web
                  dell&apos;azienda stessa
                </strong>{" "}
                (es. pagina &ldquo;Contatti&rdquo;). Non vengono raccolti
                indirizzi email riconducibili a persone fisiche identificate
                quando è possibile evitarlo, né dati provenienti da fonti
                private o non pubblicamente accessibili.
              </li>
              <li>
                <strong>Dati di navigazione anonimi</strong> — statistiche
                aggregate di utilizzo del sito (pagine visitate), raccolte
                senza cookie e senza identificare il singolo visitatore.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Finalità e base giuridica del trattamento</h2>
            <ul>
              <li>
                <strong>Rispondere a richieste di contatto o preventivo</strong> —
                base giuridica: misure precontrattuali su richiesta
                dell&apos;interessato (art. 6.1.b GDPR).
              </li>
              <li>
                <strong>
                  Attività di promozione commerciale rivolta ad aziende
                  (cold outreach B2B)
                </strong>{" "}
                — invio di comunicazioni relative a servizi di sviluppo
                software e siti web a indirizzi email aziendali generici,
                individuati come potenzialmente interessati sulla base di
                caratteristiche tecniche pubblicamente osservabili del loro
                sito web. Base giuridica: legittimo interesse del Titolare
                (art. 6.1.f GDPR e considerando 47), bilanciato da un
                meccanismo di opposizione immediato e sempre disponibile
                (vedi punto 6).
              </li>
              <li>
                <strong>Statistiche di utilizzo del sito</strong> — base
                giuridica: legittimo interesse, con trattamento minimizzato
                (nessun cookie, nessuna profilazione individuale).
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Con chi condividiamo i dati</h2>
            <p>
              I dati sono trattati con strumenti informatici e possono essere
              affidati a fornitori terzi che agiscono come responsabili del
              trattamento, in particolare:
            </p>
            <ul>
              <li>
                <strong>Google</strong> (Google Places API, infrastruttura
                Google Cloud / Firebase) per la ricerca di attività
                commerciali pubbliche e per l&apos;hosting dei sistemi.
              </li>
              <li>
                <strong>Resend</strong> per l&apos;invio delle comunicazioni
                email, con possibile trasferimento di dati verso gli Stati
                Uniti sulla base delle clausole contrattuali standard
                previste dalla normativa europea.
              </li>
              <li>
                <strong>PostHog</strong> (infrastruttura europea) per le
                statistiche di utilizzo del sito, in forma anonima.
              </li>
            </ul>
            <p>I dati non vengono in alcun caso venduti a terzi.</p>
          </section>

          <section>
            <h2>5. Per quanto tempo conserviamo i dati</h2>
            <p>
              I dati di contatto vengono conservati per il tempo necessario a
              gestire la richiesta e, se si instaura un rapporto commerciale,
              per la durata dello stesso e i termini di legge successivi. I
              dati raccolti a fini di prospezione commerciale vengono
              conservati fino a quando l&apos;azienda non risulta più di
              interesse, fino a una richiesta di cancellazione o opposizione,
              o fino alla loro cancellazione manuale da parte del Titolare.
            </p>
          </section>

          <section>
            <h2>6. Diritti dell&apos;interessato</h2>
            <p>
              In qualsiasi momento è possibile esercitare i diritti previsti
              dagli artt. 15-22 GDPR: accesso, rettifica, cancellazione,
              limitazione del trattamento, portabilità dei dati e{" "}
              <strong>opposizione</strong>. In particolare, per le
              comunicazioni di prospezione commerciale è sempre possibile
              opporsi in qualunque momento e senza necessità di
              motivazione, con effetto immediato e permanente:
            </p>
            <ul>
              <li>
                cliccando sul link di cancellazione presente in fondo a ogni
                email ricevuta;
              </li>
              <li>
                scrivendo direttamente a{" "}
                <a href="mailto:alebernardini95@gmail.com">
                  alebernardini95@gmail.com
                </a>
                .
              </li>
            </ul>
            <p>
              Resta inoltre il diritto di proporre reclamo all&apos;Autorità
              Garante per la protezione dei dati personali (
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.garanteprivacy.it
              </a>
              ).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
