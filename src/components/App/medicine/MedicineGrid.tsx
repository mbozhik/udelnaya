import Link from 'next/link'

export default function MedicineGrid({sub_entity, link}) {
  return (
    <section className="grid grid-cols-3 gap-3 sm:grid-cols-1">
      {sub_entity.map((item, index) => (
        <Link className="grid place-items-center p-5 text-center text-white duration-300 rounded-md bg-custom-primary hover:bg-custom-gray" href={`/medicine/${link}/${item.slug.current}`} key={index}>
          {item.name}
        </Link>
      ))}
    </section>
  )
}
