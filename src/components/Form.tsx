import { useState, ChangeEvent, FormEvent, Dispatch, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";


type FormsProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState:Activity = {
  id:uuidv4(),
  category:1,
  name:'',
  calories:0
}

export default function form({dispatch, state} : FormsProps) {

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])
  
  const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
 
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const {name, calories } = activity
    return name.trim()  !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    dispatch({type:'save-activity', payload: {newActivity:activity}})
    setActivity({...initialState,
      id:uuidv4()
    })
  }

  return (
    <form className="bg-slate-50 space-y-5 shadow-2xl p-10 rounded-2xl" 
    onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          name="category"
          id="category"
          className="border border-slate-400 rounded-lg w-full bg-white p-2"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-400 rounded-lg w-full bg-white p-2 "
          placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-400 rounded-lg w-full bg-white p-2 "
          placeholder="Ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input 
      type="submit" 
      className="bg-sky-500 disabled:opacity-10
      hover:bg-sky-700 uppercase w-full text-white p-2 rounded-xl cursor-pointer"
      value={activity.category === 1 ? 'guardar Comida ' : 'Guardar Ejercicio'}
      disabled={!isValidActivity()}
      />
    </form>
  );
}
