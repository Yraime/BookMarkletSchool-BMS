# BookMarkletSchool [BMS] 🎓🚀

Une liste de bookmarklets rapides et pratiques pour automatiser des trucs ou modifier des pages web en un clic, sans installer d'extensions lourdes.

---

## 🛠️ Les scripts disponibles

*   **🎨 Change Background :** Change la couleur de fond de la page.
*   **🔍 Word Counter :** Compte le nombre de mots sélectionnés.
*   **🔓 Password Unmask :** Affiche en clair les mots de passe cachés derrière les points `••••`.
*   **🖼️ Image Extractor :** Sort toutes les images d'un site dans un nouvel onglet.

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
javascript:(function(){var b='https://githubusercontent.com g(f){return fetch(b+f+q).then(function(r){if(!r.ok)throw new Error(r.status+' '+f);return r.text();});};g('files.json').then(function(t){return Promise.all(JSON.parse(t).map(g));}).then(function(a){(0,eval)('(function(){'+a.join('\n;\n')+'\n})()');}).catch(function(e){alert('Chargement impossible : '+e.message);});})();
```
