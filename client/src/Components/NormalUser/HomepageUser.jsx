import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "./PostCard";
import SidebarComponent from "./SidebarComponent";
import "./normal_user.css";
import "./postcard.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosSetup";

const Homepage_user = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const userId = localStorage.getItem("user_id");
  console.log(userId);
  const observer = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    axiosInstance
      .get("/posts")
      .then((response) => {
        setPosts(response.data.posts);
        setPagination(response.data.pagination);
        console.log("Posts:", response.data.posts);
        console.log("Pagination:", response.data.pagination);
      })
      .catch((error) => console.log("Error fetching posts", error));
  }, []);

  const loadMorePosts = useCallback((page) => {
    console.log(`Loading more posts for page ${page}`);
    axiosInstance
      .get(`/posts?page=${page}`)
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setPagination(response.data.pagination);
        console.log("More Posts:", response.data.posts);
        console.log("Updated Pagination:", response.data.pagination);
      })
      .catch((error) => console.log("Error fetching more posts", error));
  });

  const lastPostElementRef = useCallback(
    (node) => {
      //Disconnect any old observer.
      if (observer.current) observer.current.disconnect();
      //Create a new observer.
      observer.current = new IntersectionObserver((entries) => {
        //If the last post is in view and there are more posts to load, fetch the next page of posts.
        if (entries[0].isIntersecting && pagination.has_more_pages) {
          loadMorePosts(pagination.current_page + 1);
        }
      });
          // observing the last post element.
      if (node) observer.current.observe(node);
    },
    [pagination]
  );

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/posts/${id}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== id));
        alert("Post deleted", response.data.message);
      })
      .catch((error) => console.log("Error deleting post", error));
  };

  const handleUpdate = (id) => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarComponent
        collapsed={collapsed}
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="content">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            id={post.id}
            ref={posts.length === index + 1 ? lastPostElementRef : null}
            username={post.user ? post.user.name : "Unknown User"}
            // profileImageUrl={
            //   post.user ? post.user.profileImageUrl : "default-profile.png"
            // }
            postImageUrl={
              post.image
                ? `http://127.0.0.1:8000${post.image}`
                : "default-post.png"
            }
            title={post.title}
            caption={post.content}
            initialLikesCount={post.likes_count}
            initialLiked={post.liked}
            comments={post.comments || []}
            onDelete={() => handleDelete(post.id)}
            onUpdate={() => handleUpdate(post.id)}
            currentUserId={parseInt(userId, 10)}
            userId={post.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage_user;
