# Air Transport - rozwiązanie

## Struktura repozytorium
Rozwiązanie zostało podzielone na dwa branche `main` oraz `api`. <br />
Główny branch zawiera stronę z formularzem bez obsługi wysłania wiadomości email. <br />
Branch `api` zawiera kod formularza oraz api obsługujące wysyłanie wiadomości <br />

## Instrukcja uruchomienia
Zmiana brancha na api: `git switch api`

Formularz: <br />
 - w folderze `air-transport` należy pobrać moduły za pomocą komendy `npm install`
 - uruchomić stronę komendą `npm run start`
 - strona działa domyślnie na porcie 3000

Api: <br />
  - w folderze `form-api` należy pobrać moduły za pomocą komendy `npm install`
  - ustawić zmienne środowiskowe w pliku `.env` - dane dostępowe do mailtrapa
  - uruchomić api w tle komendą `node .\index.js`
  - api działa domyślnie na porcie 5000

## Opis
### Zrealizowano:
  - Formularz zawiera wszystkie wymienione w zadaniu pola
  - Każde pole jest odpowiedniego typu
  - Walidacji pól
  - Dynamiczne dodawanie kolejnych ładunków
  - Możliwość przysłyania plików metodą "drag and drop" jak i przez przycisk
  - Wysyłanie danych z formularza do api
  - Obsługa błędów przy wysłaniu oraz komunikaty dla użytkownika
  - Odpowiednie formatowanie danych w api oraz wysyłanie wiadomości email

### Nie zrealizowano:
  - Wysyłanie wiadomości email bezpośrednio z przeglądarki
