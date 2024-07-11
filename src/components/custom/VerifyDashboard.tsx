import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useToast } from "../ui/use-toast";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";

const VerifyDashboard = () => {
  const { toast } = useToast();

  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState<null | DocumentData>(null);

  const fetchCertificateData = async () => {
    const certificateRef = doc(db, "EventCertificates", certificateId);
    const certificateSnap = await getDoc(certificateRef);

    if (certificateSnap.exists()) {
      setCertificate(certificateSnap.data());
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! The Certificate does not exists.",
        description: "Please check the Certificate ID again.",
      });
    }
  };

  return (
    <section className="w-screen p-3 flex flex-col gap-4 items-center justify-center">
      <div className="p-8 md:w-1/3 border rounded-md flex flex-col items-center justify-center gap-2">
        <Input
          type="text"
          id="certificateId"
          placeholder="Enter the certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <Button className="w-full" onClick={() => fetchCertificateData()}>
          Verify
        </Button>
      </div>

      {certificate && (
        <div className="h-2/3 px-12 py-4 w-4/6 rounded-md  flex flex-col gap-2 items-center justify-center border text-center">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="font-bold">Event Name: </TableHead>
                <TableCell> {certificate["Event Name"]}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-bold">Roll Number: </TableHead>
                <TableCell>{certificate["Roll Number"]}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-bold">Name: </TableHead>
                <TableCell>{certificate["Name"]}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-bold">Issued On: </TableHead>
                <TableCell>
                  {moment(certificate["Issued On"].seconds * 1000).format(
                    "MMMM Do YYYY"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="font-bold">Role: </TableHead>
                <TableCell>{certificate["Role"]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default VerifyDashboard;
