# Zadanie API

Aplikacja API umożliwiająca operacje CRUD na kolekcji użytkowników w bazie danych MongoDB.

## Instalacja

1. Sklonuj to repozytorium lub pobierz i rozpakuj archiwum ZIP.
2. W katalogu projektu uruchom terminal i wpisz `npm install` aby zainstalować wymagane zależności.
3. Uruchom serwer API komendą `npm start`.

## Dostępne ścieżki

### GET /users

Zwraca wszystkich użytkowników z bazy danych.

### GET /users/:id

Zwraca użytkownika o podanym identyfikatorze.

### POST /users

Dodaje nowego użytkownika do bazy danych.

### PUT /users/:id

Aktualizuje użytkownika o podanym identyfikatorze.

### DELETE /users/:id

Usuwa użytkownika o podanym identyfikatorze.

## Dokumentacja API

Dokumentacja API jest dostępna pod adresem `http://localhost:3000/api-docs`.
