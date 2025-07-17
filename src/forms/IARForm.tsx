import { IARSchema } from "../schema/IARSchema"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

type FormData = z.infer<typeof IARSchema>;

export default function IARForm() {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver:zodResolver(IARSchema)
    })

    const onSubmit = (data:FormData) => {
        console.log(data);
    }
    return(
        <>
            <form className="flex flex-col p-4 gap-3 items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-fit gap-5">
                    <div className="flex justify-start">
                        <span className="text-[18px] font-medium">IAR Details:</span>
                        <input className="text-[18px] font-medium mx-3 border-b-2 border-transparent focus:outline-0 focus:border-b-2 focus:border-gray-300" type="text" placeholder="0000-00-000"/>
                    </div>
                    <hr className="border-gray-300 border-1 mb-5 mt-2"/>
                    <div className="flex flex-row flex-wrap gap-y-6 gap-x-4 mt-3">
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">IAR ID</label>
                            <input {...register('iarID', {valueAsNumber:true})} type="text" className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"/>
                            {errors.iarID && <p className="text-red-500">{errors.iarID.message}</p>}
                        </div>
                        
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Date Received - COA</label>
                            <input {...register('dateReceivedCoa', {valueAsDate:true})} type="datetime-local" className="appearance-none text-[16] focus:outline-0  focus:border-b-black focus:border-0"/>
                            {errors.dateReceivedCoa && <p className="text-red-500">{errors.dateReceivedCoa.message}</p>}
                        </div>
                        
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Supplier</label>
                            <select {...register('supplier', {valueAsNumber:true})} className="text-[16] focus:outline-0 focus:border-0">
                                <option value={1}>Supplier 1</option>
                            </select>
                            {errors.supplier && <p className="text-red-500">{errors.supplier.message}</p>}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">IAR Date</label>
                            <input {...register('iarDate', {valueAsDate:true})} type="date" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.iarDate && <p className="text-red-500">{errors.iarDate.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-y-6 gap-x-4 mt-3">
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Date Received</label>
                            <input {...register('dateReceived', {valueAsDate:true})} type="date" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.dateReceived && errors.dateReceived.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Date of Acceptance</label>
                            <input {...register('dateAcceptance', {valueAsDate:true})} type="date" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.dateAcceptance && errors.dateAcceptance.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Date Inspection</label>
                            <input {...register('dateInspection', {valueAsDate:true})} type="date" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.dateInspection && errors.dateInspection.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Sales Invoice</label>
                            <input {...register('salesInvoice')} type="text" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.salesInvoice && errors.salesInvoice.message}
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-y-6 gap-x-4 mt-3">
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Date Invoice</label>
                            <input {...register('dateInvoice', {valueAsDate:true})} type="date" className="appearance-none text-[16] focus:outline-0 focus:border-0"/>
                            {errors.dateInvoice && errors.dateInvoice.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Received By</label>
                            <select {...register('receivedBy', {valueAsNumber:true})} className="text-[16] focus:outline-0 focus:border-0">
                                <option value="1">Employee 1</option>
                            </select>
                            {errors.receivedBy && errors.receivedBy.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Submitted By</label>
                            <select {...register('submittedBy', {valueAsNumber:true})} className="text-[16] focus:outline-0 focus:border-0">
                                <option value="1">Employee 2</option>
                            </select>
                            {errors.submittedBy && errors.submittedBy.message}
                        </div>
                        <div className="flex flex-col bg-gray-50 px-3 pt-3 w-2xs border-b-2 border-gray-300">
                            <label className="text-[12px] font-medium text-gray-600">Office</label>
                            <select {...register('office', {valueAsNumber:true})} className="text-[16] focus:outline-0 focus:border-0">
                                <option value="1">ADN ASDI IMO</option>
                                <option value="2">SDN ASDI IMO</option>
                                <option value="3">SDS ASDI IMO</option>
                                <option value="4">ADS ASDI IMO</option>
                            </select>
                            {errors.office && errors.office.message}
                        </div>
                    </div>
                    
                    <div className="flex justify-end my-4">
                        <button type="submit" className="float-fight w-fit px-3 py-1 bg-black text-white rounded-xs hover:bg-gray-500 transition duration-200 text-[16px] font-medium">ADD IAR</button>
                    </div>
                    <hr className="border-gray-300 border-1"/>
                </div>
                
            </form>
        </>
    )
}