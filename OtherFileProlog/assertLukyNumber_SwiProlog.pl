assert(nextAnswer(1)).
assert(changeAnswere(X):-(retract(nextAnswer(_)),assert(nextAnswer(X)))).
assert(resetAnswer:-changeAnswere(1)).
assert(getActualAnswer(Ans):-(nextAnswer(X),clause(answer(X,Ans,_,_),_))).
assert(setResponse(X):-(nextAnswer(Z),answer(Z,_,X,Y),changeAnswere(Y))).
assert(getResult(X):- X=='no result as default').
assert(luckyNumber(0)).
assert(addToluckyNumber(X):-(retract(luckyNumber(Y)),Z is X+Y,assert(luckyNumber(Z)))).
assert(answer(1,'Hai un gatto?','si',2):-addToluckyNumber(1)).
assert(answer(1,'Hai un gatto?','no',3)).
assert(answer(2,'Quanti coloria il tuo gatto?',X,4):-(X>2,addToluckyNumber(X))).
assert(answer(2,'Quanti colori ha il tuo gatto?',X,5):-X<2).
assert(answer(2,'Quanti colori ha il tuo gatto?',2,3):-addToluckyNumber(2)).
assert(answer(4,'Il tuo gatto è un maschio?','si',3)).
assert(answer(4,'Il tuo gatto è un maschio?','no',5)).
assert(answer(5,'Il nome della tua gatta inizia con la M?','no',3):-addToluckyNumber(1)).
assert(answer(5,'Il nome della tua gatta inizia con la M?','si',3):-addToluckyNumber(10)).
assert(answer(3,'Ti piacerebbe avere un cane o ne hai uno?','si',7):-addToluckyNumber(3)).
assert(answer(3,'Ti piacerebbe avere un cane o ne hai uno?','no',7)).
assert(answer(6,'Il tuo colore preferito è chiaro?','si',7):-addToluckyNumber(5)).
assert(answer(6,'Il tuo colore preferito è chiaro?','no',7):-addToluckyNumber(3)).
assert(answer(7,'Scrivi il tuo nome:',Nome,8):-(atom_length(Nome,X),addToluckyNumber(X),X>=6)).
assert(answer(7,'Scrivi il tuo nome:',Nome,-1):-(atom_length(Nome,X),addToluckyNumber(X),X<6)).
assert(answer(8,'Scrivi il tuo cognome:',Cognome,-1):-(atom_length(Cognome,X),addToluckyNumber(-X))).


(MODULE_SESSION:vass(X),MODULE_SESSION:pres(Y),Y>=X,assert(MODULE_SESSION:pres(X)),assert(MODULE_SESSION:sottoassicurazione(false),assert(MODULE_SESSION:coefSottAss(Z))))