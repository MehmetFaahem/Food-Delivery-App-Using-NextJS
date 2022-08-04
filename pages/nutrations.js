import { Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import Parent from "../screens/BottomBar";
import DenseTable from "../screens/nutrations";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from "next/link";

export default function Nutration() {
    return (
        <Parent>
            <Container sx={{
                p: 7,
                mt: 2,
                paddingBottom: 100
            }}>
                <DenseTable />
                <Link href='/foods'>
                    <Button variant="contained" style={{
                        backgroundColor: '#080c24',
                        marginTop: 10,
                        color: 'white'
                    }} startIcon={<ArrowCircleRightIcon style={{ fontSize: 34, }} />}>
                        Choose Snacks
                    </Button>
                </Link>
            </Container>
        </Parent>
    )
}
