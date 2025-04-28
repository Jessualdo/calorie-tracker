import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { initialState, activityReducer } from "./reducers/activity-reducer"
import ActivitiesList from "./components/ActivitiesList"
import CalorieTracker from "./components/CalorieTracker"




function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

const canRestartApp = () => useMemo(() => state.activities.length ,[state.activities])



  return (
    <>

    <header className="bg-emerald-500 p-4">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">Contador de calorias</h1>
      
        <button  className="bg-gray-900 hover:bg-gray-700 p-3 font-bold text-white cursor-pointer rounded-xl text-sm disabled:opacity-10"
        disabled={!canRestartApp()}
        onClick={() => dispatch({type: 'restart-app'})}
        >
      REINICIAR APP
    </button>
      </div>
    </header>

    <section className="bg-emerald-300 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <Form 
        dispatch={dispatch}
        state={state}
        ></Form>
      </div>
    </section>

    <section className="bg-slate-800 py-11">
      <div className="max-w-4xl mx-auto">
        <CalorieTracker
        activities={state.activities}
        />
      </div>
    </section>
    
    
    <section className="p-10 mx-auto max-w-4xl">
      <ActivitiesList
      activities={state.activities}
      dispatch={dispatch}
      />
    </section>
    </>
  )
}

export default App
