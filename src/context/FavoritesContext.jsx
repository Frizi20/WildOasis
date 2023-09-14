import { createContext, useContext, useState } from "react"


const FavoritesContext = createContext()

 function FavoritesProvider({children}) {

    const [favoriteItems, setFavoriteItems] = useState([])


    function toggleItem(id){
        setFavoriteItems(prevItems=>{
            if(prevItems.includes(id)){
                return prevItems.filter(item=> item !==id)
            }
            
            return [...prevItems, id]
        })
    }

    return (
       <FavoritesContext.Provider value={{ favoriteItems, toggleItem }}>
            {children}
       </FavoritesContext.Provider>
    )
}

 function useFavorites(){
    const context = useContext(FavoritesContext);
    if(!context) throw new Error('Context used outside provider')
    return context
}


export {FavoritesProvider, useFavorites}