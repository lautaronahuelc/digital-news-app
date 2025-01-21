"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import Preloader from "@/components/Preloader";
import PostItemOne from "@/components/PostItemOne";
import TrendingPost from "@/components/TrendingPost";
import { PostItem } from "@/types/PostItem";

import "./posts.css";

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostItem[]>([]);
  const [item, setItem] = useState<PostItem | null>(null);

  const getItemsData = () => {
    fetch("/api/postitems")
      .then((res) => res.json())
      .then((data: PostItem[]) => setItems(data))
      .catch((e) => console.log(e.message));
  };

  const getSinglePostData = (id: string) => {
    fetch(`api/postitems/${id}`)
      .then((res) => {
        if (res.status === 404) {
          router.push("/not-found");
        }
        return res.json();
      })
      .then((data: PostItem) => setItem(data))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getItemsData();
    getSinglePostData("678ef5b1b748c355673e4ebc");
  });

  if (!item) return null;
  
  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <PostItemOne large={true} item={item} />
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items && items.length > 0 ? (
                  items
                    .filter((item) => !item.trending && !item.top)
                    .slice(0, 3)
                    .map((item) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {items && items.length > 0 ? (
                  items
                    .filter((item) => !item.trending && !item.top)
                    .slice(3, 6)
                    .map((item) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {items && items.length > 0 ? (
                      items
                        .filter((item) => item.trending)
                        .map((item, index: number) => (
                          <TrendingPost
                            key={item._id}
                            index={index}
                            item={item}
                          />
                        ))
                    ) : (
                      <Preloader />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
