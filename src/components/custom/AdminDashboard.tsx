import { Navigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useAdminContext } from "../../contexts/AdminContext";
import { AlertCircle, DownloadIcon } from "lucide-react";
import CertificatesTable from "./CertificatesTable";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { Timestamp as TimeStampType } from "@firebase/firestore-types";
import moment from "moment";
import { db } from "../../firebase";

type Certificate = {
  "Event Name": string;
  "Issued On": TimeStampType;
  Name: string;
  Role: string;
  "Roll Number": string;
  ID?: string;
  ""?: string;
};

const AdminDashboard = () => {
  const admin = useAdminContext();
  const [file, setFile] = useState<File | undefined | null>();
  const [certificates, setCertificates] = useState<null | Certificate[]>(null);

  useEffect(() => {
    async function addData() {
      if (!certificates) return;
      for (let i = 0; i < certificates.length; i++) {
        const certificate = certificates[i];
        const docData = {
          ...certificate,
          "Issued On": Timestamp.fromDate(
            moment(certificate["Issued On"], "DD-MM-YYYY").toDate()
          ),
        };

        delete docData["ID"];
        delete docData[""];

        if (!docData.Name) return;
        //@ts-ignore
        await setDoc(doc(db, "EventCertificates", certificate["ID"]), docData, {
          merge: true,
        });
      }
      location.reload();
    }

    addData();
  }, [certificates]);

  if (!admin.isLoggedIn) return <Navigate to="/admin/login" />;

  const fileReader = new FileReader();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const csvFileToArray = (string: string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        //@ts-expect-error Types don't match
        object[header.trim()] = values[index];
        return object;
      }, {});
      return obj;
    });

    //@ts-expect-error Types don't match
    setCertificates(array);
  };

  const exportAsCSV = async () => {
    const certificateRef = await getDocs(collection(db, "EventCertificates"));
    const certificateRecords: Certificate[] | [] = [];

    certificateRef.forEach((doc) => {
      const data = doc.data();
      const certificate = { ID: doc.id, ...data };
      //@ts-ignore
      certificateRecords.push(certificate);
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\n Certificate ID, Event Name, Issued On, Name, Role, Roll Number\n" +
      certificateRecords
        .map((e) =>
          [
            e.ID,
            e["Event Name"],
            moment(e["Issued On"].seconds * 1000).format("DD-MM-YYYY"),
            e.Name,
            e.Role,
            e["Roll Number"],
          ].join(",")
        )
        .join("\n");

    console.log(csvContent);

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        if (!event) return;
        if (!event.target) return;
        const csvOutput = event.target.result;
        //@ts-expect-error Types don't match
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  return (
    <section className="w-screen px-8 py-3">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Danger!</AlertTitle>
        <AlertDescription>
          Reloading the page will log you out. We are working on it and will fix
          it soon.
        </AlertDescription>
      </Alert>
      <div className="flex gap-1.5 items-center justify-center">
        <form className="py-3 flex justify-end w-full items-center gap-1.5">
          <Input
            id="database"
            type="file"
            accept={".csv"}
            onChange={handleOnChange}
          />{" "}
          <Button type="submit" onClick={(e) => handleOnSubmit(e)}>
            Submit
          </Button>
        </form>
        <Button
          variant="outline"
          className="flex gap-1"
          onClick={() => exportAsCSV()}
        >
          <DownloadIcon className="h-4 w-4" />
          Export as CSV
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => admin.loginAdmin("", "")}
        >
          Logout
        </Button>
      </div>
      <CertificatesTable />
    </section>
  );
};

export default AdminDashboard;
