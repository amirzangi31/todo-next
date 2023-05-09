import Link from "next/link";
import React from "react";
import { VscListSelection } from "react-icons/vsc";
import { RxDashboard } from 'react-icons/rx'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { signOut, useSession } from "next-auth/react";
function Layout({ children }) {
  const { status, data } = useSession()



  return (
    <div className="container">
      <header>
        <p> Todo app (zangiabadi1378888@gmail.com)</p>
        <p className="text-xs">Hello ! {status === "authenticated" && data.user.email}</p>
        {status === "authenticated" ? (<button onClick={() => signOut()}>  Log Out <FiLogOut /> </button>) : null}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href={"/"}> Todos</Link>
            </li>
            <li>
              <BiMessageSquareEdit />
              <Link href={"/add-todo"}> Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href={"/profile"}> Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
