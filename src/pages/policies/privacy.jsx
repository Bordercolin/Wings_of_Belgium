import React from "react";
import MenuButton from "../../components/global/buttons/MenuButton";
import { Helmet } from "react-helmet";

export default function privacy() {
  return (
    <>
      <Helmet>
        <title>Privacybeleid</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <div>
        <h2>Inleiding</h2>

        <p>
          De Belgische Luchtmacht (hierna aangeduid als "BAF") neemt de privacy
          van haar gebruikers (hierna aangeduid als "u" of "uw") zeer serieus.
          Dit privacybeleid legt uit hoe we informatie verzamelen, gebruiken en
          openbaar maken in verband met de BAF game-app (hierna aangeduid als
          "App").
        </p>

        <h3>Informatie die we verzamelen</h3>

        <p>We verzamelen de volgende soorten informatie via de App:</p>

        <ul>
          <li>
            <strong>Apparaatinformatie:</strong> We verzamelen niet-persoonlijk
            identificeerbare informatie over uw apparaat, zoals het
            apparaatmodel, de versie van het besturingssysteem en de unieke
            apparaatidentificatie. Deze informatie wordt gebruikt om de
            functionaliteit van de App te verbeteren en compatibiliteit met uw
            apparaat te garanderen.
          </li>
          <li>
            <strong>Gameplay-informatie:</strong> We verzamelen informatie over
            uw gameplay-activiteit, zoals uw voortgang, scores en prestaties.
            Deze informatie wordt gebruikt om uw game-ervaring te personaliseren
            en leaderboards te maken.
          </li>
          <li>
            <strong>Optionele informatie:</strong> We kunnen aanvullende
            informatie verzamelen die u ervoor kiest om te verstrekken, zoals uw
            naam en avatar. Deze informatie wordt gebruikt om uw profiel te
            personaliseren en u in staat te stellen te communiceren met andere
            spelers.
          </li>
        </ul>

        <h3>Gebruik van informatie</h3>

        <p>
          We gebruiken de verzamelde informatie voor de volgende doeleinden:
        </p>

        <ul>
          <li>Om de App te bedienen en te verbeteren</li>
          <li>Om uw game-ervaring te personaliseren</li>
          <li>Om met u te communiceren over de App</li>
          <li>Om onze servicevoorwaarden af te dwingen</li>
        </ul>

        <h3>Informatiedeling</h3>

        <p>
          We zullen uw persoonlijke informatie niet zonder uw toestemming delen
          met derden. We kunnen niet-persoonlijk identificeerbare informatie
          delen met derden voor analysedoeleinden.
        </p>
        <p>
          We kunnen dit privacybeleid van tijd tot tijd wijzigen. We zullen u op
          de hoogte stellen van eventuele wijzigingen door het nieuwe
          privacybeleid op de App te plaatsen.
        </p>

        <h3>Contacteer ons</h3>

        <p>
          Als u vragen heeft over dit privacybeleid, neem dan contact met ons op
          via [contactgegevens invoegen].
        </p>

        <h3>Aanvullende informatie</h3>

        <p>
          Dit privacybeleid is onderworpen aan de wetten van België. U heeft
          mogelijk ook rechten onder de Algemene Verordening Gegevensbescherming
          (AVG). U kunt meer informatie vinden over uw rechten onder de AVG{" "}
          <a href="https://gdpr.eu/">hier</a>.
        </p>
      </div>
    </>
  );
}
