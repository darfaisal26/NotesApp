"use client";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface FormData {
  title: string;
  content: string;
  id: any;
}
export default function AddNote() {
  const username = useSearchParams();
  const name = username.get("name");

  const [Notedata, setNoteData] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  const [getNotes, setgetNotes] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [newNote, setNewNote] = useState<Boolean>(true);

  useEffect(() => {
    async function getData() {
      let notes = await fetch(`/api/getNote`);
      notes = await notes.json();

      setgetNotes(notes);
    }
    getData();
    console.log(getNotes, "getnotes");
  }, [count]);

  async function handleRequest(data: FormData) {
    try {
      if (newNote) {
        // Check input is not blank
        if (data.title) {
          // CREATE
          await fetch(`/api/createNote/`, {
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }).then(() => {
            setNoteData({ title: "", content: "", id: "" });
            setCount(count + 1);
          });
        } else {
          alert("Title can not be blank");
        }
      } else {
        // UPDATE
        await fetch(`/api/editnote/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        })
          .then((res) => {
            setNoteData({ title: "", content: "", id: "" });
            setNewNote(true);
            console.log(res.status);
          })
          .catch((error: any) => {
            console.log(error);
            toast.error(error);
          });
      }
      setCount(count + 1);
      setCount(count - 1);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  }
  async function updateNote(title: any, content: any, id: any) {
    setNoteData({ title, content, id });
    setNewNote(false);
  }
  async function deleteNote(id: Number) {
    try {
      await fetch(`/api/deletenote/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  token ",
        },
      }).then(() => {
        toast.success("note deleted successfully");
      });
      setCount(count - 1);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <main className=" box-border">
      <Header />
      <div className="flex mt-20 w-100   justify-between px-20 box-border">
        <div className="flex flex-col p-4 h-100 justify-center items-center  ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRequest(Notedata);
            }}
            action=""
            className=" bg-white shadow-md
             py-10 w-auto flex 
             flex-col 
             px-4
             rounded-lg
             border-solid justify-center 
             items-center "
          >
            <div className="m-2">
              <input
                type="text"
                placeholder="Title"
                value={Notedata.title}
                onChange={(e) =>
                  setNoteData({ ...Notedata, title: e.target.value })
                }
                className="border-2 border-solid p-3 text-black "
              />
            </div>
            <div className="my-4 mx-2 ">
              <textarea
                name=""
                id="content"
                placeholder="Content"
                rows={2}
                cols={25}
                value={Notedata.content}
                onChange={(e) =>
                  setNoteData({ ...Notedata, content: e.target.value })
                }
                className=" max-w-full border-2 px-1 py-1 text-black"
              ></textarea>
            </div>

            <div className="m-2">
              {newNote ? (
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 font-bold"
                >
                  Add Note +
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 font-bold"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        <div className=" p-4 mx-10 flex h-100  text-black text-xl  box-border w-full ">
          <ul>
            <h3 className="text-center text-black text-lg font-2xl">
              <span>{name}</span>
              Note List
            </h3>
            {getNotes &&
              getNotes.map((note: any) => {
                return (
                  <li key={note.id} className="">
                    <div className=" flex  justify-between border box-border  border-gray-900 bg-white shadow-md rounded px-2 pt-6 pb-6 mb-4">
                      <div className="box-border">
                        <h1 className="text-lg font-medium">
                          <span className="text-black  text-lg mr-2 font-bold ">
                            Title:
                          </span>
                          {note.title}
                        </h1>
                        <p className=" text-black text-sm mb-2  font-medium">
                          <span className=" text-black mr-2 font-bold  font-3xl">
                            Content:
                          </span>
                          {note.content}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <button
                          className=" max-h-50 bg-blue-500 mx-4 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() =>
                            updateNote(note.title, note.content, note.id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
}
