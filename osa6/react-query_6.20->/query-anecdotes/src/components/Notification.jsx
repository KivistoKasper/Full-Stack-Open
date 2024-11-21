import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const msg = useNotificationValue()
  if (msg === null) return null

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
