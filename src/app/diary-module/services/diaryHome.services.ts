import { Injectable } from '@angular/core'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    CollectionReference,
    DocumentData,
    Firestore,
} from '@angular/fire/firestore'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Card } from '../components/diary-card/card'

@Injectable({ providedIn: 'root' })
export class DiaryHomeService {
    cards: any[] = []
    cardCollection: CollectionReference<DocumentData>

    constructor(firestore: Firestore) {
        this.cardCollection = collection(firestore, 'Post')
    }

    getCards(): Observable<Card[]> {
  
        return new Observable((observer) => {
            onSnapshot(this.cardCollection, (snapshot) => {
                const cards:any[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(cards);
                
                observer.next(cards)
            })
        })
    }

    addCard(card: Card) {

        const date = new Date()
        return new Observable((observer) => {
            addDoc(this.cardCollection, {
              ...card,
              created: date,
            }).then((doc) => {
              observer.next({ ...card, id: doc.id } as Card);
            });
          });
    }
}