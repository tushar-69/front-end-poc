"use client";
import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import IPlaylist from './iPlaylist';
import AddPlayList from '../container/addPlayList';
import UpdatePlayList from '../container/updatePlayList';

export default function PlayListPage () {
  const [toggleAddPlayList, setToggleAddPlayList] = useState(false);
  const [toggleUpdatePlayList, setToggleUpdatePlayList] = useState(false);
  const [playLists, setPlayLists] = useState<Array<IPlaylist>>([]);
  const [updatePlayListData, setUpdatePlayListData] = useState<IPlaylist>();
  const apiEndPoint = "http://localhost:5213/playlist";

  const getPlayLists = async () => {
    const { data: res } = await axios.get(apiEndPoint);
    setPlayLists(res);
  };

  useEffect(() => {  
    getPlayLists();
  }, []);

  const addPlayList = async () => {
    setToggleAddPlayList(!toggleAddPlayList);
  };

  const handleUpdate = async (post: IPlaylist) => {
    setUpdatePlayListData(post);
    setToggleUpdatePlayList(!toggleUpdatePlayList);
  };

  const handleDelete = async (post: IPlaylist) => {
    await axios.delete(apiEndPoint + "/" + post.id);
    getPlayLists();
  };

  if (playLists.length === 0) return <h2> there are no playlist in the Database </h2>;
  return (
    <>
    <h2 data-test-id="title">PlayList</h2>
      <div className="container">
      
        <button data-test-id="btnAddPlayList" onClick={addPlayList} className="btn btn-primary btn-sm">
          Add Playlist
        </button>
        {toggleAddPlayList && <AddPlayList />}
        {toggleUpdatePlayList && <UpdatePlayList name={updatePlayListData?.name || ''} movies={updatePlayListData?.movies || []} />}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Movies</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {playLists?.map((post) => (
              <tr key={post.id}>
                <td > {post.name} </td>
                {post.movies.map((movie) => (
                  <li>{movie}</li>
                ))}
                <td>
                  <button
                    onClick={() => handleUpdate(post)}
                    data-test-id="btnUpdatePlayList"
                    className="btn btn-info btn-sm"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    data-test-id="btnDeletePlayList"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}