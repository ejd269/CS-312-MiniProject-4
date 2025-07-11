// importing react and axios
import { useEffect, useState} from "react"
import axios from "axios"

// dashboard component
// setting up dashboard as a variable to = an unnamed function which uses updatePage as a parameter
const Dashboard = ({updatePage, userId}) => {
    
    // creating constants that use functions to update the values within the constant using useState
    const [userPosts, setUserPosts] = useState([]);

    const [creatorName, setCreatorName] = useState("");
    const [titleName, setTitleName] = useState("");
    const [blogContent, setBlogContent] = useState("");
    
    const [editingElement, setEditingElement] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    // this uses HW4 as the backend to grab posts. logs response data and sets user posts as the response (posts array)
    useEffect(() => {
        axios.get("http://localhost:3001/").then((response) => {console.log(response.data); setUserPosts(response.data.posts)});
    }, [])


    // submit posts logic
    const onSubmitButton = () => {
        // create the new user post object, assign it to a variable, then send that data to the backend server with a post request
        const newPost = {
            id: Date.now().toString(),
            title: titleName,
            name: creatorName,
            content: blogContent,
            date: new Date().toLocaleString(),
            userId: 1,
        };
        axios.post("http://localhost:3001/", newPost);
        setUserPosts([...userPosts, newPost]);
    }

    // delete post logic
    const onDeletePost = (passedUserId) => {
        // creates new variable that will return an array with filtered userPosts array (eliminating the particular post we want to remove)
        const newUserPosts = userPosts.filter(post => post.id !== passedUserId);
        // calling setUserPosts function to the new array, eliminating post
        setUserPosts(newUserPosts);
        // updating backend to remove designated post
        axios.post("http://localhost:3001/delete", {id: passedUserId});
    }

    // edit post logic
    const onSubmitEdit = (passedUserPostId) => {

        // creates new variable that will return the post we want to find
        let foundUserPost= userPosts.find(post => post.id === passedUserPostId);

        // creating object for editing post information
        const replacedUserPost = {
            id: foundUserPost.id,
            title: editedTitle,
            name: foundUserPost.name,
            content: editedContent,
            date: foundUserPost.date,
            userId: foundUserPost.userId,
        }

        // removing old post
        const newUserPosts = userPosts.filter(post => post.id !== passedUserPostId);

        // updating array with new post
        setUserPosts([replacedUserPost,...newUserPosts])
        

        // updating backend to remove old post
        axios.post("http://localhost:3001/delete", {id: passedUserPostId}).then( () => {
            axios.post("http://localhost:3001/", replacedUserPost);
        });
    }

    // returns the main HTML for the dashboard
    return (
        <>
            <div id="form-area">
                <h1>CS-312 Blog Web Application</h1>
                <h2>Hello! Please enter some information to post on the blog:</h2>
                <div>
                    <div id="separator">
                        <label htmlFor="name" >Blog Creator Name:</label>
                        <input value={creatorName} onChange={(event) => {setCreatorName(event.target.value)}} id="name" name="name" required/> 
                        <label htmlFor="title" >Blog Title:</label>
                        <input value={titleName} onChange={(event) => {setTitleName(event.target.value)}} type="text" id="title" name="title" required/>
                    </div>
                    <label htmlFor="content" >Blog Content:</label>
                    <textarea value={blogContent} onChange={(event) => {setBlogContent(event.target.value)}} name="content" type="text" id="content" required></textarea>
                    <button onClick={(event) => onSubmitButton(event)}type="submit">Submit</button>
                </div>
            </div>


            <section id="cards">
                    <ul className="posts-list">
                        {userPosts.map( (userPost) => {
                            return (<li key={userPost.id} className="post">
                                    <article>
                                        { !editingElement ? <h3> {userPost.title} </h3> : <input onChange={(event) => setEditedTitle(event.target.value)} value={editedTitle}/> } 
                                        { !editingElement ? <h3> {userPost.content} </h3> : <input onChange={(event) => setEditedContent(event.target.value)} value={editedContent}/> } 
                                        <p id="postInfo">Written by <b>{userPost.name}</b> on <b>{userPost.date}</b></p>
                                        <div className="options">
                                            <div>
                                                <input type="hidden" name="id" value="<%= post.id %>"/>
                                                {userPost.userId === userId ?
                                                !editingElement ? <button onClick={() =>setEditingElement(true)}>Edit</button>:
                                                <>
                                                <button onClick={() =>{setEditingElement(false); onSubmitEdit(userPost.id)}}>Finish Editing</button>
                                                <button onClick={() => setEditingElement(false)}>Cancel</button>
                                            </>

                                                : <></>}                                             
                                                </div>
                                            <form action="/delete" className="form" method="POST">
                                                <input type="hidden" name="id" value="<%= post.id %>"/>
                                                <button onClick={() => onDeletePost(userPost.id)}>Delete</button>
                                            </form>
                                        </div>
                                    </article>
                                </li>)
                            })}  
                    </ul>
            </section>
        </>
        
    )
}

// exports Dashboard at the end, calling updatePage to load the dashboard
export default Dashboard