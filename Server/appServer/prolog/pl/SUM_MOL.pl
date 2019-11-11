						
					
MODULE_SESSION:answer(1,'Inserisci il primo numero',X,2):-assert(MODULE_SESSION:n1(X))
MODULE_SESSION:answer(2,'Inserisci il secondo numero',X,3):-assert(MODULE_SESSION:n2(X))
MODULE_SESSION:answer(3,'vuoi fare la somma?','no',4)
MODULE_SESSION:answer(3,'vuoi fare la somma?','si',-1):-(MODULE_SESSION:n1(X),MODULE_SESSION:n2(Y),Z is X+Y,assert(MODULE_SESSION:ris(Z)))
MODULE_SESSION:answer(4,'vuoi fare la moltiplicazione?','si',-1):-(MODULE_SESSION:n1(X),MODULE_SESSION:n2(Y),Z is X*Y,assert(MODULE_SESSION:ris(Z)))
MODULE_SESSION:getResult(Ris):-MODULE_SESSION:ris(Ris)