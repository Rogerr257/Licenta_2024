# Meșteri la un Click

Adresă Github Repository: https://github.com/CristinaCroitoru/Licenta_2024/

# Cerințe preliminare

Pentru a putea rula acest proiect, este necesar să aveți instalate următoarele:

Node.js și npm (pot fi descărcate de pe site-ul oficial Node.js)
Angular CLI
Firebase CLI

# Pașii de compilare ai aplicației

git clone https://github.com/CristinaCroitoru/Licenta_2024.git
cd Licenta_2024

# Instalați dependențele/pachetele proiectului
npm install

# Instalați Angular CLI global (dacă nu este deja instalat)
npm install -g @angular/cli

# Instalați Firebase CLI global (dacă nu este deja instalat)
npm install -g firebase-tools

# Pașii de lansare ai aplicației de Angular: 
ng serve

# Pentru posibiltatea trimiterii mailurilor este necesară rularea unui proiect separat de Node.js, având conținutul fișierului src\app\index-nodemailer.js.

# Cerințe preliminare
Se rulează comanda npm install pentru instalarea dependențelor. 

# Pașii de lansare ai aplicației de Node.js: 
node index-nodemailer.js

