import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import { collection, onSnapshot, DocumentData, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CollectionOptions } from "./types";
import { getQuery } from "./getQuery";

type ListnerState = {
    name?: string
    unsubscribe: () => void
}

export const useFireStore = <T extends DocumentData>(path: string) => {
    const listenersRef = useRef<ListnerState[]>([]);

    useEffect(() => {
        let listenersRefValue: ListnerState[] | null = null;

        if (listenersRef.current) {
            listenersRefValue = listenersRef.current;
        }

        return () => {
            if (listenersRefValue) {
                listenersRefValue.forEach(listener => {
                    listener.unsubscribe();
                })
            }
        }
    }, [])

    const dispatch = useAppDispatch();

    const loadCollection = useCallback((actions: GenericActions<T>, options?: CollectionOptions) => {
        dispatch(actions.loading());

        const query = getQuery(path, options);

        const listener = onSnapshot(query, {
            next: querySnapshot => {
                const data: DocumentData[] = [];
                if (querySnapshot.empty) {
                    dispatch(actions.success([] as unknown as T))
                    return;
                }
                querySnapshot.forEach(doc => {
                    data.push({id: doc.id, ...doc.data()})
                })
                dispatch(actions.success(data as unknown as T))
            },
            error: error => {
                dispatch(actions.error(error.message));
                console.log('Collection error:', error.message);
            }
        })
        listenersRef.current.push({name: path, unsubscribe: listener});

    }, [dispatch, path])

    const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
        dispatch(actions.loading());
        const docRef = doc(db, path, id);

        const listener = onSnapshot(docRef, {
            next: doc => {
                if (!doc.exists) {
                    dispatch(actions.error('Document does not exist'));
                    return;
                }
                dispatch(actions.success({id: doc.id, ...doc.data()} as unknown as T))
            }
        })
        listenersRef.current.push({name: path + '/' + id, unsubscribe: listener})

    }, [dispatch, path])

    const create = async (data: T) => {
        try {
            const ref = doc(collection(db, path));
            await setDoc(ref, data);
            return ref;
        } catch (error) {
            console.log(error)
        }
    }

    const update = async (id: string, data: T) => {
        const docRef = doc(db, path, id);
        try {
            return await updateDoc(docRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    const remove = async (id: string) => {
        try {
            return await deleteDoc(doc(db, path, id));
        } catch (error) {
            console.log(error);
        }
    }

    const set = async (id: string, data: any) => {
        try {
            return await setDoc(doc(db, path, id), data);
        } catch (error: any) {
            console.log(error)
        }
    }

    return {loadCollection, loadDocument, create, update, remove, set}
}