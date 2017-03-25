# Basic dependency sort

- parent put last, 
- children put first, 
- if exists move to first,
- check with all parents, if exists = circular reference

## example

```
class D{ c:C; f:F}
class E{ c: C}
class B{ a:A; f:F }
class C{ a:A; b:B }
class A{}
class F{}

[D] -> D (put last)
    D.[C] -> C D (put first)
        D.C.[A] -> A C D (put first)
        D.C.[B] -> B A C D (put first)
            D.C.B.[A] -> A B C D (exists move first) ***
            D.C.B.[F] -> F A B C D (put first)
    D.[F] -> F A B C D (pass)

first branch result [F A B C D]

[E] -> E
    E.[C] -> E (dont put C because already on previous result)
        E.C.[A] -> E 
        E.C.[B] -> E
            E.C.B.[A] -> E
            E.C.B.[F] -> E
add second result to the last = [F A B C D E]

[B] -> (already on previous result)
    B.[A] -> (already on previous result)
    B.[F] -> (already on previous result)
third result is empty

[C] -> (already on previous result)
    C.[A] -> (already on previous result)
    C.[B] -> (already on previous result)
        C.B.[A] -> (already on previous result)
        C.B.[F] -> (already on previous result)
forth result is empty

[A] -> (already on previous result)
fifth result is empty

[F]-> (already on previous result)
sixth result is empty
```


## Circular reference detection

```
class A{ b: B }
class B{ c: C }
class C{ a: A } <-- circular
class D{ e: E }
class E{ f: F }
class F{ } 

[A, D, E, F, C, B]

[A] -> A
    A.[B] -> B A
        A.B.[C] -> C B A
            A.B.C.[A] -> (A have the same with its parent) ** A has Circular
[B] -> B
    B.[C] -> C B
        B.C.[A] -> A C B
            B.C.A.[B] -> ** B has circular
[C] -> C
    C.[A] -> A C
        C.A.[B] -> B A C
            C.A.B.[C] -> ** C has circular
[D] -> D
    D.[E] -> E D
        D.E.[F] -> F E D
result F E D
```

class D{ c:C; f:F}
class E{ c: C}
class B{ a:A; f:F }
class C{ a:A; b:B }
class A{}
class F{}

STEP 1, RECURSION PROCESS

D -> D 
    D.C -> C 
        D.C.A -> A 
        D.C.B -> B 
            D.C.B.A -> A  
            D.C.B.F -> F  
    D.F -> F
E -> E
    E.C -> C
        E.C.A -> A
        E.C.B -> B
            E.C.B.A -> A
            E.C.B.F -> F
B -> B
    B.A -> A
    B.F -> F
C -> C
    C.A -> A
    C.B -> B
        C.B.A -> A
        C.B.F -> F
