interface PopUpEditProps {
  onClose: () => void;
}

export const PopUpEdit: React.FC<PopUpEditProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#fafafa] w-[400px] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Editar Chat</h2>
        <div className="relative">
          <input
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-600 focus:border-gray-900 focus:ring-0 appearance-none focus:outline-none peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#fafafa] px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
          >
            Nombre del contacto
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
