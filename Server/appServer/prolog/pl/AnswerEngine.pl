%#################################MOTORE DOMANDE
MODULE_SESSION:nextAnswer(1)
MODULE_SESSION:changeAnswre(X):-(retract(MODULE_SESSION:nextAnswer(_)),assert(MODULE_SESSION:nextAnswer(X)))
MODULE_SESSION:resetAnswer:-(MODULE_SESSION:changeAnswre(1))
MODULE_SESSION:getActualAnswer(Ans):-(MODULE_SESSION:nextAnswer(X),clause(MODULE_SESSION:answer(X,Ans,_,_),_))
MODULE_SESSION:setResponse(X):-(MODULE_SESSION:nextAnswer(Z),MODULE_SESSION:answer(Z,_,X,Y),MODULE_SESSION:changeAnswere(Y))
MODULE_SESSION:getResult('no result as default')
MODULE_SESSION:getAllAnswer(A,B,C,D,X):-(clause(MODULE_SESSION:answer(A,B,C,D),Z),format(atom(X), "~w",Z))
%###################################MOTORE CACHE
%------------add
cache('null','null','null',X)
addCache(S,ID,RISP,COUNT2):-(cache(S,ID,RISP,COUNT),retract(cache(S,ID,RISP,COUNT)),COUNT2 is COUNT+1,assert(cache(S,ID,RISP,COUNT2)),!)
addCache(S,ID,RISP,1):-assert(cache(S,ID,RISP,1))
%------------sort
insert_sort(List,Sorted):-i_sort(List,[],Sorted)
i_sort([],Acc,Acc)
i_sort([H|T],Acc,Sorted):-(insert(H,Acc,NAcc),i_sort(T,NAcc,Sorted))
insert((X1,X2),[(Y1,Y2)|T],[(Y1,Y2)|NT]):-(X2<Y2,insert((X1,X2),T,NT))
insert((X1,X2),[(Y1,Y2)|T],[(X1,X2),(Y1,Y2)|T]):-X2>=Y2
insert(X,[],[X])
%---------clear
clearList([],[]):-!
clearList([(X,Y)],[X]):-!
clearList([(X,Y)|T],[X|TT]):-clearList(T,TT)
%---------------
orderListCache(X,Y):-(insert_sort(X,Z),clearList(Z,Y))
getCache(S,ID,X):-(findall((R,C),cache(S,ID,R,C),L),orderListCache(L,X))