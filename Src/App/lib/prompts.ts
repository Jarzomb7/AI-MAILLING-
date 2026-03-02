// ============================================================
// PROMPTY DLA GENERATORA COLD MAILI
// ============================================================

export interface FormData {
  companyName: string;
  websiteUrl?: string;
  industry: string;
  city: string;
  hasWebsite: boolean;
  screenshotBase64?: string;
}

/** Prompt systemowy – persona AI */
export const SYSTEM_PROMPT = `Jesteś ekspertem od tworzenia stron internetowych i agencją webową.
Piszesz spersonalizowane cold maile po polsku w imieniu agencji webowej.
Maile mają brzmieć naturalnie, profesjonalnie i przekonująco – jak od człowieka, nie od bota.
Nigdy nie podajesz cen. Nie używasz emotikonów.
Zawsze podpisuj się: "Pozdrawiam, [Twoje imię] / Agencja WebPro"`;

/** Prompt dla firmy, która MA stronę */
export function buildHasWebsitePrompt(data: FormData): string {
  return `Napisz profesjonalny cold mail do firmy "${data.companyName}" z branży "${data.industry}" z miasta "${data.city}".

KONTEKST:
- Firma posiada stronę internetową${data.websiteUrl ? `: ${data.websiteUrl}` : ""}
- ${data.screenshotBase64 ? "Dołączono zrzuty ekranu strony do analizy." : "Brak zrzutów ekranu – bazuj na typowych problemach branżowych."}

ZADANIE:
Napisz mail według DOKŁADNEJ struktury poniżej:

---

Temat: Kilka spostrzeżeń dot. strony ${data.companyName} – czy warto porozmawiać?

Dzień dobry,

Natknąłem się ostatnio na stronę ${data.companyName} i chciałem podzielić się kilkoma spostrzeżeniami, które mogą mieć realny wpływ na liczbę klientów pozyskiwanych przez internet.

[Napisz jedno zdanie o tym, czym zajmuje się firma i że masz doświadczenie z branżą ${data.industry}]

Zauważyłem kilka obszarów, które warto poprawić:

• [KONKRETNA WADA 1 – np. czas ładowania, brak SSL, nieczytelna nawigacja]
• [KONKRETNA WADA 2 – np. brak sekcji opinii klientów, słabe CTA]
• [KONKRETNA WADA 3 – np. brak optymalizacji mobilnej]
• [KONKRETNA WADA 4 – np. brak danych strukturalnych, słabe SEO lokalne dla ${data.city}]

Nowa strona, zaprojektowana od podstaw z myślą o klientach z ${data.city}, mogłaby przynieść:

✓ [KORZYŚĆ 1 – konkretna, mierzalna]
✓ [KORZYŚĆ 2 – konkretna, mierzalna]
✓ [KORZYŚĆ 3 – konkretna, mierzalna]
✓ [KORZYŚĆ 4 – konkretna, mierzalna]

Nie piszę o przeróbkach ani dodaniu wtyczki – mam na myśli nową stronę, zaprojektowaną od zera, która faktycznie pracuje na pozyskiwanie klientów, a nie tylko istnieje w sieci.

Czy byłby/byłaby Pan/Pani otwarta na krótką rozmowę, żeby pokazać, jak mogłoby to wyglądać konkretnie dla ${data.companyName}?

Pozdrawiam,
[Twoje imię]
Agencja WebPro

---

WAŻNE ZASADY:
- Użyj nazwy firmy: "${data.companyName}", branży: "${data.industry}", miasta: "${data.city}"
- Wady mają być KONKRETNE i wiarygodne dla tej branży
- Korzyści mają być MIERZALNE
- Nie podawaj cen
- Mail ma brzmieć jak napisany przez człowieka
- Zachowaj strukturę z (•) dla wad i (✓) dla korzyści`;
}

/** Prompt dla firmy, która NIE MA strony */
export function buildNoWebsitePrompt(data: FormData): string {
  return `Napisz profesjonalny cold mail do firmy "${data.companyName}" z branży "${data.industry}" z miasta "${data.city}".

KONTEKST:
- Firma NIE posiada strony internetowej
- Cel: przekonać do stworzenia pierwszej strony

ZADANIE:
Napisz mail według DOKŁADNEJ struktury poniżej:

---

Temat: Czy klienci z ${data.city} mogą Cię znaleźć w internecie?

Dzień dobry,

Szukam firm z branży ${data.industry} w ${data.city} i zauważyłem, że ${data.companyName} nie pojawia się w wynikach Google – ani na mapach, ani w wyszukiwarce.

[Napisz 2 zdania o tym, jak wiele osób szuka usług z branży ${data.industry} lokalnie przez Google]

Brak strony internetowej dziś oznacza:

• Klienci, którzy szukają ${data.industry} w ${data.city}, trafiają do konkurencji
• Brak widoczności w Google Maps i lokalnym SEO
• Niemożność zbierania opinii online, które budują zaufanie
• Brak możliwości kontaktu po godzinach pracy

Strona internetowa dla ${data.companyName} mogłaby zmienić to w ciągu kilku tygodni:

✓ Pojawienie się w Google Maps dla fraz takich jak "${data.industry} ${data.city}"
✓ Strona działająca 24/7 – klienci mogą się skontaktować w dowolnej chwili
✓ Sekcja z opiniami klientów budująca zaufanie nowych odbiorców
✓ Profesjonalny wizerunek wyróżniający na tle konkurencji
✓ Możliwość promowania ofert bezpośrednio do lokalnych klientów
✓ Analityka – wiedza, ilu ludzi szuka Twoich usług w ${data.city}

Przygotowałem wstępny pomysł na stronę dla ${data.companyName}, który chętnie Państwu przedstawię.

Czy mógłbym/mogłabym przesłać krótkie demo lub umówić 15-minutową rozmowę?

Pozdrawiam,
[Twoje imię]
Agencja WebPro

---

WAŻNE ZASADY:
- Użyj nazwy firmy: "${data.companyName}", branży: "${data.industry}", miasta: "${data.city}"
- Korzyści mają być KONKRETNE dla tej branży i miasta
- Nie podawaj cen
- Mail ma brzmieć naturalnie`;
}
