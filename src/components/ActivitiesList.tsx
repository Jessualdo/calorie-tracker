import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}
export default function ActivitiesList({activities, dispatch}:ActivityListProps) {

const categoryName = useMemo(()=>
  (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),[activities])

  const isEmptyActivity = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl font-bold text-cyan-800 text-center pt-4">
        Actividades y Comidas</h2>

        {isEmptyActivity ? <p className="text-center my-6">No Hay nada aún...</p> :  

        activities.map(activity => (
          <div key={activity.id} className="px-5 py-10 bg-emerald-50 mt-5 flex justify-between">
            <div className="space-y-2 relative">
              <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                ${activity.category === 1 ? 'bg-violet-500' : 'bg-amber-500'}`} >
                {categoryName(activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">
                {activity.name}
              </p>
              <p className="font-black text-4xl text-cyan-500">
                {activity.calories} {''}
                <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button>
                <PencilSquareIcon
                onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id} })}
                className="h-8 w-8 text-cyan-700"
                />
              </button>

              <button>
                <XCircleIcon
                onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id} })}
                className="h-8 w-8 text-red-700"
                />
              </button>
            </div>
          </div>
        ))}
    </>
  )
}
