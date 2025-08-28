import { useSelector } from "react-redux";
import CreateUser from "../features/users/CreateUser";
import Button from "./Button";
function Home() {
  const username=useSelector(state=>state.user.username)
  return (
    <div className="flex items-center justify-center h-full">
      <div className=" text-center  my-10">
        <h1 className="text-2xl font-semibold mb-8 md:text-4xl ">
          The best pizza.
          <br />
          <span className="text-yellow-500  ">
            Straight out of the oven, straight to you.
          </span>
        </h1>
        
        {username ? <Button type={'primary'} to={'/menu'}>Continue ordering,{username} </Button>  : <CreateUser /> }
      </div>
    </div>
  );
}

export default Home;
