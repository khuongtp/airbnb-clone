import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="">
      <Header
        placeholder={`${location} | ${range} | ${noOfGuests} guest${
          noOfGuests > 1 ? "s" : ""
        }`}
      />
      <main className="relative flex bg-red xl:h-[calc(100vh-92px)]">
        <section className="flex-grow pt-14 px-6 h-full xl:overflow-scroll">
          <p className="text-sm">
            300+ Stays - {range} for {noOfGuests} guest{noOfGuests > 1 && "s"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 whitespace-nowrap text-gray-800">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="">
            {searchResults?.map(
              (
                { img, title, location, description, star, price, total },
                index
              ) => (
                <InfoCard
                  key={index}
                  img={img}
                  location={location}
                  description={description}
                  star={star}
                  price={price}
                  title={title}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:sticky xl:top-0 xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}

export default Search;
