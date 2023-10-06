import React, { useRef } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import dayjs from 'dayjs'

import cloneDeep from 'lodash/cloneDeep'

const FileManagement = ({ values, setValues }) => {
  const inputRef = useRef(null)

  const onClickInputFile = () => {
    inputRef.current.click()
  }

  const onChangeFile = e => {
    const newDocs = cloneDeep(values.docs)
    newDocs.push({ file: e.target.files[0], uploadDate: dayjs() })

    setValues({ ...values, docs: newDocs })
  }

  const deleteFile = removeIndex => {
    const newDocs = cloneDeep(values.docs)
    newDocs.splice(removeIndex, 1)

    setValues({ ...values, docs: newDocs })
  }

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>【ファイル管理】</Typography>
          <Button variant='contained' color='info' onClick={onClickInputFile}>
            新規ファイルアップロード
            <input type='file' hidden onChange={onChangeFile} ref={inputRef} />
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>ファイル名</TableCell>
                  <TableCell>アップロード日</TableCell>
                  <TableCell align='right'>アクション</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.docs?.map((doc, index) => {
                  const uploadDate = dayjs(doc.uploadDate).format('YYYY年MM月DD日')
                  const key = dayjs(doc.uploadDate).toISOString()

                  return (
                    <TableRow key={`${key}-${index}`}>
                      <TableCell>{doc?.file?.name || doc?.name}</TableCell>
                      <TableCell>{uploadDate}</TableCell>
                      <TableCell align='right'>
                        <Button variant='contained' color='error' onClick={() => deleteFile(index)}>
                          削除
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  )
}

export default FileManagement
