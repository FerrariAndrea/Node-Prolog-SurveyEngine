%#################################NUMERO FORTUNATO
luckyNumber(0).
addToluckyNumber(X):-retract(luckyNumber(Y)),Z is X+Y,assert(luckyNumber(Z)).

%#################################ANSWER
%---------------------GATTO
answer(1,'Hai un gatto?','si',2):-addToluckyNumber(1).
answer(1,'Hai un gatto?','no',3).
answer(2,'Quanti coloria il tuo gatto?',X,4):-X>2,addToluckyNumber(X).
answer(2,'Quanti colori ha il tuo gatto?',X,5):-X<2.
answer(2,'Quanti colori ha il tuo gatto?',2,3):-addToluckyNumber(2).
answer(4,'Il tuo gatto è un maschio?','si',3).
answer(4,'Il tuo gatto è un maschio?','no',5).
answer(5,'Il nome della tua gatta inizia con la M?','no',3):-addToluckyNumber(1).
answer(5,'Il nome della tua gatta inizia con la M?','si',3):-addToluckyNumber(10).
%---------------------CANE
answer(3,'Ti piacerebbe avere un cane o ne hai uno?','si',7):-addToluckyNumber(3).
answer(3,'Ti piacerebbe avere un cane o ne hai uno?','no',7).
%---------------------COLORE
answer(6,'Il tuo colore preferito è chiaro?','si',7):-addToluckyNumber(5).
answer(6,'Il tuo colore preferito è chiaro?','no',7):-addToluckyNumber(3).
%---------------------NOME-COGNOME
answer(7,'Scrivi il tuo nome:',Nome,8):-atom_length(Nome,X),addToluckyNumber(X),X>=6.
answer(7,'Scrivi il tuo nome:',Nome,-1):-atom_length(Nome,X),addToluckyNumber(X),X<6.
answer(8,'Scrivi il tuo cognome:',Cognome,-1):-atom_length(Cognome,X),addToluckyNumber(-X).
%#################################MOTORE DOMANDE
nextAnswer(1).
changeAnswere(X):-retract(nextAnswer(_)),assert(nextAnswer(X)).
resetAnswer:-changeAnswere(1).
next(TextAnswer):-nextAnswer(X),answer(X,TextAnswer,_,_).
setResponse(X):-nextAnswer(Z),answer(Z,_,X,Y),changeAnswere(Y).
