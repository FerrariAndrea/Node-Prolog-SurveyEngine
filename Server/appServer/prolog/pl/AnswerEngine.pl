%#################################MOTORE DOMANDE
MODULE_SESSION:nextAnswer(1)
MODULE_SESSION:changeAnswere(X):-(retract(MODULE_SESSION:nextAnswer(_)),assert(MODULE_SESSION:nextAnswer(X)))
MODULE_SESSION:resetAnswer:-(MODULE_SESSION:changeAnswere(1))
MODULE_SESSION:getActualAnswer(Ans):-(MODULE_SESSION:nextAnswer(X),clause(MODULE_SESSION:answer(X,Ans,_,_),_))
MODULE_SESSION:setResponse(X):-(MODULE_SESSION:nextAnswer(Z),MODULE_SESSION:answer(Z,_,X,Y),MODULE_SESSION:changeAnswere(Y))
MODULE_SESSION:getResult('no result as default')
MODULE_SESSION:getAllAnswer(A,B,C,D,X):-(clause(MODULE_SESSION:answer(A,B,C,D),Z),format(atom(X), "~w",Z))
%###################################MOTORE CACHE

addToOrderList([H|T],RISP,COUNT):-
getCache(SURVEY,ID,X):-(cache(SURVEY,ID,RISP,COUNT),addToOrderList(X,RISP,COUNT))