%#################################NUMERO FORTUNATO
MODULE_SESSION:luckyNumber(0)
MODULE_SESSION:addToluckyNumber(X):-(retract(MODULE_SESSION:luckyNumber(Y)),Z is X+Y,assert(MODULE_SESSION:luckyNumber(Z)))
%#################################ANSWER
%---------------------GATTO
MODULE_SESSION:answer(1,'Hai un gatto?','si',2):-MODULE_SESSION:addToluckyNumber(1)
MODULE_SESSION:answer(1,'Hai un gatto?','no',3)
MODULE_SESSION:answer(2,'Quanti coloria il tuo gatto?',X,4):-(X>2,MODULE_SESSION:addToluckyNumber(X))
MODULE_SESSION:answer(2,'Quanti colori ha il tuo gatto?',X,5):-X<2
MODULE_SESSION:answer(2,'Quanti colori ha il tuo gatto?',2,3):-MODULE_SESSION:addToluckyNumber(2)
MODULE_SESSION:answer(4,'Il tuo gatto è un maschio?','si',3)
MODULE_SESSION:answer(4,'Il tuo gatto è un maschio?','no',5)
MODULE_SESSION:answer(5,'Il nome della tua gatta inizia con la M?','no',3):-MODULE_SESSION:addToluckyNumber(1)
MODULE_SESSION:answer(5,'Il nome della tua gatta inizia con la M?','si',3):-MODULE_SESSION:addToluckyNumber(10)
%---------------------CANE
MODULE_SESSION:answer(3,'Ti piacerebbe avere un cane o ne hai uno?','si',7):-MODULE_SESSION:addToluckyNumber(3)
MODULE_SESSION:answer(3,'Ti piacerebbe avere un cane o ne hai uno?','no',7)
%---------------------COLORE
MODULE_SESSION:answer(6,'Il tuo colore preferito è chiaro?','si',7):-MODULE_SESSION:addToluckyNumber(5)
MODULE_SESSION:answer(6,'Il tuo colore preferito è chiaro?','no',7):-MODULE_SESSION:addToluckyNumber(3)
%---------------------NOME-COGNOME
MODULE_SESSION:answer(7,'Scrivi il tuo nome:',Nome,8):-(atom_length(Nome,X),MODULE_SESSION:addToluckyNumber(X),X>=6)
MODULE_SESSION:answer(7,'Scrivi il tuo nome:',Nome,-1):-(atom_length(Nome,X),MODULE_SESSION:addToluckyNumber(X),X<6)
MODULE_SESSION:answer(8,'Scrivi il tuo cognome:',Cognome,-1):-(atom_length(Cognome,X),MODULE_SESSION:addToluckyNumber(-X))
