type props = {
  calendarEvent: {
    id: string | number
    title: string
    start: string
    end: string
  }
}

export default function CustomEventModal({ calendarEvent }: props) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        color: '#000',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <h2 style={{ marginBottom: '5px' }}>Custom event modal displaying:</h2>
      <br />
      {calendarEvent.title}
    </div>
  )
}
