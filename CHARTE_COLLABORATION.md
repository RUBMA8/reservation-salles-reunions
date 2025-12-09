#Règle 1 : Une branche par fonctionnalité

Chaque membre travaille UNIQUEMENT sur sa branche feature/
Ne JAMAIS commit directement sur main ou develop

#Règle 2 : Commits réguliers

Minimum 4-5 commits par personne
Messages de commit clairs et en français
Format: type(scope): message

feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: mise en forme
refactor: refactorisation



#Règle 3 : Pull Requests obligatoires

Toutes les features passent par une PR vers develop
Au moins 1 reviewer par PR
Ne pas merger sa propre PR (quelqu'un d'autre le fait)

#Règle 4 : Synchronisation régulière

Avant de commencer à travailler:

bash  git checkout develop
  git pull origin develop
  git checkout feature/votre-branche
  git merge develop
  
#Règle 5 : Résolution de conflits

Si conflit, en discuter en équipe
Ne jamais forcer un push (git push -f)
Tester après chaque merge
