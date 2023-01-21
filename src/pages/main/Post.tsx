import {Post as IPost} from "./Main";
import {addDoc, deleteDoc, getDocs, collection, query, where, doc} from "firebase/firestore";
import {auth, db} from "../../config/Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";

interface PostProps {
    post: IPost
};

interface Like {
    id: string;
    userId: string;
}

export const Post = (props: PostProps) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, id: doc.id })));
    };

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, {id: newDoc.id, userId: user?.uid}]
                        : [{id: newDoc.id, userId: user?.uid}]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", post.userId)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.id !== likeId));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p>Likes: {likes.length}</p>}
            </div>
        </div>
    );
};