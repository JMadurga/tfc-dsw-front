import { Header } from "../Components/Header/Header";
import { MapAlmacen } from "../Components/MapAlmacen/MapAlmacen";


export  const HomePage = () =>{

    return(
        <div className="flex flex-col min-h-screen gap-5 font-ibm">
            <Header></Header>
            <MapAlmacen></MapAlmacen>               
        </div>
    )
}