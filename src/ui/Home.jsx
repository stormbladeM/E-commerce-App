function Home() {
  return (
    <div className=" h-full w-full bg-amber-200 p-10">
      <div className=" text-center flex flex-col h-50 w-full justify-center items-center gap-6p-10">
        <h2 className="text-xl">
          Welcome friends Kindly create an account with us and shop seamlessly
          at the comfort of your home
        </h2>
        <div>
          <form className="flex flex-col gap-4">
            <input
              type="tel"
              placeholder="Username"
              className="bg-yellow-200 mt-4 p-1 rounded-lg w-60 focus:outline-none text-lg"
            />
            <button className="bg-cyan-200">Create an Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
