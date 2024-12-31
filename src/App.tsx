import { useState, ChangeEvent } from 'react';
import { RiMenuUnfold4Line, RiMenuFoldLine } from "react-icons/ri";

const chats = {
  Constructora: [
    { text: 'Hola, ¿cómo estás?', sender: 'Juan', time: '10:00 AM' },
    { text: '¡Muy bien, gracias! ¿Y tú?', sender: 'Yo', time: '10:01 AM' },
    { text: 'Todo bien, gracias. ¿Has tenido tiempo de revisar el proyecto que te envié?', sender: 'Juan', time: '10:02 AM' },
    { text: 'Sí, lo revisé anoche. Me gustaría hacer algunos ajustes en la distribución.', sender: 'Yo', time: '10:03 AM' },
    { text: 'Claro, dime qué cambios tienes en mente.', sender: 'Juan', time: '10:04 AM' },
    { text: 'Me gustaría que los baños fueran un poco más grandes y también ajustar las ventanas para mayor luz natural.', sender: 'Yo', time: '10:05 AM' },
    { text: 'Perfecto, te enviaré el diseño modificado en un par de días.', sender: 'Juan', time: '10:06 AM' },
    { text: 'Excelente, espero verlo pronto. ¡Gracias!', sender: 'Yo', time: '10:07 AM' },
    { text: 'De nada, ya verás que el cambio se verá mucho mejor.', sender: 'Juan', time: '10:08 AM' },
    { text: '¡Genial! ¿Hay algo más que deba tener en cuenta?', sender: 'Yo', time: '10:09 AM' },
    { text: 'Sí, quizás revisar las conexiones de agua en las cocinas para ver si es necesario algún ajuste.', sender: 'Juan', time: '10:10 AM' },
    { text: 'De acuerdo, lo revisaré.', sender: 'Yo', time: '10:11 AM' },
    { text: 'Estaré atento a cualquier comentario que tengas.', sender: 'Juan', time: '10:12 AM' },
    { text: 'Perfecto, te aviso en cuanto tenga algo más.', sender: 'Yo', time: '10:13 AM' },
    { text: 'Gracias, ¡estoy seguro de que el proyecto quedará increíble!', sender: 'Juan', time: '10:14 AM' },
    { text: '¡Lo mismo digo! ¡Nos mantenemos en contacto!', sender: 'Yo', time: '10:15 AM' },
  ],
  Inmobiliaria: [
    { text: '¿Me puedes agendar una cita?', sender: 'Cliente', time: '10:00 AM' },
    { text: 'Claro, ¿qué día te gustaría?', sender: 'Yo', time: '10:01 AM' },
    { text: '¿Te viene bien el jueves a las 10 AM?', sender: 'Cliente', time: '10:02 AM' },
    { text: 'Sí, está perfecto. ¿Te gustaría que la cita fuera en la oficina o prefieres por videollamada?', sender: 'Yo', time: '10:03 AM' },
    { text: 'Prefiero videollamada.', sender: 'Cliente', time: '10:04 AM' },
    { text: 'Listo, te enviaré el enlace de la reunión a tu correo.', sender: 'Yo', time: '10:05 AM' },
    { text: 'Muchas gracias.', sender: 'Cliente', time: '10:06 AM' },
    { text: '¡Nos vemos el jueves!', sender: 'Yo', time: '10:07 AM' },
    { text: 'Estupendo. ¿Qué temas vamos a tocar en la cita?', sender: 'Cliente', time: '10:08 AM' },
    { text: 'Vamos a revisar algunas propiedades que te pueden interesar y hablar sobre los requisitos para la compra.', sender: 'Yo', time: '10:09 AM' },
    { text: 'Perfecto, me interesa mucho conocer las opciones.', sender: 'Cliente', time: '10:10 AM' },
    { text: 'Te enviaré un catálogo con los detalles antes de la reunión para que puedas tener una idea.', sender: 'Yo', time: '10:11 AM' },
    { text: 'Me parece excelente, estaré pendiente.', sender: 'Cliente', time: '10:12 AM' },
    { text: '¡Perfecto, nos vemos el jueves a las 10 AM!', sender: 'Yo', time: '10:13 AM' },
    { text: 'Nos vemos entonces, ¡gracias!', sender: 'Cliente', time: '10:14 AM' },
    { text: '¡Hasta luego!', sender: 'Yo', time: '10:15 AM' },
  ],
  Sioma: [
    { text: '¿Nos vemos mañana?', sender: 'Amigo', time: '10:00 AM' },
    { text: 'Sí, a las 3 PM.', sender: 'Yo', time: '10:01 AM' },
    { text: '¡Genial! ¿En el parque de siempre?', sender: 'Amigo', time: '10:02 AM' },
    { text: 'Sí, ahí está bien.', sender: 'Yo', time: '10:03 AM' },
    { text: 'Perfecto, ¿y qué haremos?', sender: 'Amigo', time: '10:04 AM' },
    { text: 'Podemos jugar un rato al fútbol, y luego tomarnos algo en el café de la esquina.', sender: 'Yo', time: '10:05 AM' },
    { text: '¡Perfecto! Hace tiempo que no jugamos.', sender: 'Amigo', time: '10:06 AM' },
    { text: 'Sí, lo extrañaba. Además, el café tiene una nueva bebida que quiero probar.', sender: 'Yo', time: '10:07 AM' },
    { text: '¡Perfecto! Siempre hay algo nuevo por probar.', sender: 'Amigo', time: '10:08 AM' },
    { text: 'Definitivamente. ¡Nos vemos mañana!', sender: 'Yo', time: '10:09 AM' },
    { text: '¡Nos vemos!', sender: 'Amigo', time: '10:10 AM' },
    { text: '¡No olvides tus zapatos de fútbol!', sender: 'Yo', time: '10:11 AM' },
    { text: 'No te preocupes, ya los tengo listos.', sender: 'Amigo', time: '10:12 AM' },
    { text: '¡Jajaja, buenísimo! Nos vemos mañana a las 3.', sender: 'Yo', time: '10:13 AM' },
    { text: 'Nos vemos, ¡hasta mañana!', sender: 'Amigo', time: '10:14 AM' },
    { text: '¡Hasta mañana!', sender: 'Yo', time: '10:15 AM' },
  ],
};

type ChatKey = keyof typeof chats;

function App() {
  const [selectedChat, setSelectedChat] = useState<ChatKey>('Constructora');
  const [query, setQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const filteredContacts = Object.keys(chats).filter((contact) =>
    contact.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="flex h-screen relative">
      <div className={`fixed inset-0 bg-gray-950 text-white p-4 border-r border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/3 z-10`}>
        <div className='flex justify-between items-center text-2xl mb-4'>
          <h2 className="text-2xl font-bold">Chats</h2>
          <RiMenuFoldLine className="text-gray-100 cursor-pointer md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        <div>
          <input
            type="text"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleQueryChange(e.target.value)}
            placeholder="Buscar..."
            className="w-full p-2 mb-4 text-lg text-gray-950 placeholder:text-gray-600 bg-gray-300 rounded-xl focus:ring-2 focus:ring-gray-700 focus:outline-none transition duration-300 ease-in-out"
          />
        </div>

        <div>
          {filteredContacts.map((contact, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(contact as ChatKey)} 
              className="flex justify-between items-center border-b border-gray-700 py-2 rounded-lg p-2 hover:bg-gray-900 mb-3 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold">{contact}</h3>
                <p className="text-sm text-gray-400">{chats[contact as ChatKey][0].text}</p>
              </div>
              <span className="text-sm text-gray-500">{chats[contact as ChatKey][0].time}</span>
            </div>
          ))}
        </div>
      </div>

      {!isSidebarOpen && (
        <RiMenuUnfold4Line
          className="text-gray-900 cursor-pointer absolute top-4 right-4 z-20 text-2xl md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <div className={`flex-grow flex flex-col h-screen ${isSidebarOpen ? 'w-full' : 'w-full md:w-2/3'}`} style={{ background: 'linear-gradient(to bottom, #d3d3d3, #00008b)' }}>
        <div className="p-4 border-b border-gray-400 bg-gray-300 bg-opacity-75 flex justify-between items-center">
          <h2 className="text-xl font-bold">{selectedChat}</h2>
        </div>

        <div className="flex-grow p-4 overflow-y-auto bg-gray-300 bg-opacity-75">
          <div className="space-y-4">
            {chats[selectedChat].map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl max-w-[80%] ${message.sender === 'Yo' ? 'bg-gray-900 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'}`}
                style={{ textAlign: 'left', position: 'relative' }}
              >
                <div>{message.text}</div>
                <div className="text-xs text-gray-400" style={{ position: 'absolute', bottom: '4px', right: '8px' }}>
                  {message.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;