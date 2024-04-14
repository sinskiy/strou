export default function Home() {
  return (
    <main>
      <div>
        <input type="time" name="time" id="time" />
        <input type="text" name="title" id="title" />
        <button className="filled">Add</button>
      </div>
      <div data-active>
        <p>
          <time dateTime="">17:00</time>-<time dateTime="21:00">21:00</time>
        </p>
        <p>Domra</p>
        <button className="outlined">Edit</button>
        <button className="outlined danger">Delete</button>
      </div>
    </main>
  );
}
