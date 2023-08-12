"use client";
import axios from "axios";
import React, { useState } from "react";

interface FormData {
  title: any;
  content: any;
  id: any;
}
export default function Home() {
  const [Notedata, setNoteData] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  async function create(data: FormData) {
    try {
      // axios.post("http://loacalhost:3000/api/createnote", {
      //   title: Notedata.title,
      //   content: Notedata.content,
      //   header,
      // });
      await fetch("http://loacalhost:3000/api/createnote", {
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
        },
        method: "POST",
      }).then(() => setNoteData({ title: "", content: "", id: "" }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="flex flex-col max-w-full justify-center items-center m-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(Notedata);
          }}
          action=""
          className=" bg-blue-300
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
              className="border-2 border-solid p-3 text-black"
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
            <button
              type="submit"
              className="bg-blue-600 py-2 px-4 
             rounded-lg hover:bg-green-200"
            >
              Add Note +
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
