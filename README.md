# BookMarkletSchool [BMS] 🎓🚀

Une liste de bookmarklets rapides et pratiques pour automatiser des trucs ou modifier des pages web en un clic, sans installer d'extensions lourdes.

---

## ✨ Les Features

*   **🔄 Mises à jour automatiques (Zero-Maintenance) :** Tu installes le bookmarklet une seule fois. Dès que le code est modifié sur GitHub, tu reçois la mise à jour instantanément sans rien réinstaller.
*   **⚡ Anti-Cache intelligent :** Le loader intègre un système d'horodatage (`Date.now()`) qui force le navigateur à charger la version la plus récente du code, évitant les scripts obsolètes bloqués en cache.
*   **🪶 Ultra léger :** Moins d'une ligne de code stockée dans ton navigateur. Zéro impact sur les performances ou la mémoire de ta machine par rapport à une extension classique.

---

## 🚀 Comment installer un Bookmarklet ?

L'installation prend exactement 3 secondes :

### 1. Afficher la barre des favoris
Si ce n'est pas déjà fait, affiche la barre des favoris de ton navigateur :
*   **Chrome / Edge / Opera / Firefox :** `Ctrl + Shift + B` (Windows) ou `Cmd + Shift + B` (Mac).
*   **Alternative :** Clic droit tout en haut de la fenêtre -> *Barre des favoris* -> *Toujours afficher*.

### 2. Créer le favori (Méthode manuelle)
1. Fais un **clic droit** sur un espace vide de ta barre des favoris.
2. Clique sur **Ajouter une page** (ou *Ajouter un favori*).
3. Dans le champ **Nom** : Mets ce que tu veux (ex: `BMS` ou `Google` pour rester discret).
4. Dans le champ **URL** (ou *Adresse*) : Colle l'intégralité du code du script principal fourni ci-dessous.
5. Enregistre.

### 3. Lancer le script
Va sur le site de ton choix, et **clique simplement sur le favori** dans ta barre. Le code s'exécute directement sur la page.

⚠️ **Attention :** Sur certains sites, le bookmarklet ne pourra pas être lancé, car le site bloque les injections de scripts (via les règles de sécurité CSP).

---

## 💻 Script d'installation principal (BMS Loader)

Copie cette ligne de code et colle-la dans le champ **URL** de ton favori :

```javascript
javascript:(function()%7Bjavascript%3A(function () %7B%0A%09var b %3D 'https%3A%2F%2Fraw.githubusercontent.com%2FYraime%2FBookMarkletSchool-BMS%2Fmain%2F'%2C%0A%09%09q %3D '%3F' %2B Date.now()%3B%0A%0A%09function g(f) %7B%0A%09%09return fetch(b %2B f %2B q).then(function (r) %7B%0A%09%09%09if (!r.ok) throw new Error(r.status %2B ' ' %2B f)%3B%0A%09%09%09return r.text()%3B%0A%09%09%7D)%3B%0A%09%7D%0A%0A%09g('files.json')%0A%09%09.then(function (t) %7B return Promise.all(JSON.parse(t).map(g))%3B %7D)%0A%09%09.then(function (a) %7B (0%2C eval)('(function()%7B' %2B a.join('%5Cn%3B%5Cn') %2B '%5Cn%7D)()')%3B %7D)%0A%09%09.catch(function (e) %7B alert('Chargement impossible %3A ' %2B e.message)%3B %7D)%3B%0A%7D)()%3B%7D)()%3B
```
