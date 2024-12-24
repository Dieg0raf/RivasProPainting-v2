// import About from "./components/About/About";
import LandingSection from "@/components/shared/Landing";

// TODO: Change the backgroundPath prop to the correct path
export default function Home() {
  return (
    <>
      <LandingSection backgroundPath="/images/" />
      <h1>Home Page</h1>
    </>
  );
}
