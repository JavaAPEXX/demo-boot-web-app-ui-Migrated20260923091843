package com.demo.app.service;

import com.demo.app.model.Document;
import com.demo.app.repository.DocRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DocServiceImplTest {

    @Mock
    private DocRepository docRepository;

    @InjectMocks
    private DocServiceImpl docServiceImpl;

    @Test
    @DisplayName("givenValidInput_whenDocServiceImpl_thenReturnSuccess()")
    void givenValidInput_whenDocServiceImpl_thenReturnSuccess() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of(new Document(1L, "doc1")));

        // Act
        List<Document> result = docServiceImpl.findAllDocs(1L);

        // Assert
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("givenInvalidInput_whenDocServiceImpl_thenReturnException()")
    void givenInvalidInput_whenDocServiceImpl_thenReturnException() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of());

        // Act and Assert
        assertThrows(NoSuchElementException.class, () -> docServiceImpl.findAllDocs(1L));
    }

    @Test
    @DisplayName("givenNullInput_whenDocServiceImpl_thenReturnException()")
    void givenNullInput_whenDocServiceImpl_thenReturnException() {
        // Arrange
        when(docRepository.findUserDocs(null)).thenThrow(NullPointerException::new);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> docServiceImpl.findAllDocs(null));
    }

    @Test
    @DisplayName("givenEmptyCollection_whenDocServiceImpl_thenReturnEmptyList()")
    void givenEmptyCollection_whenDocServiceImpl_thenReturnEmptyList() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of());

        // Act
        List<Document> result = docServiceImpl.findAllDocs(1L);

        // Assert
        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("givenNonExistingId_whenDocServiceImpl_thenReturnEmptyList()")
    void givenNonExistingId_whenDocServiceImpl_thenReturnEmptyList() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of());

        // Act
        List<Document> result = docServiceImpl.findAllDocs(1L);

        // Assert
        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("givenDuplicateId_whenDocServiceImpl_thenReturnException()")
    void givenDuplicateId_whenDocServiceImpl_thenReturnException() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of(new Document(1L, "doc1")));

        // Act and Assert
        assertThrows(DuplicateElementException.class, () -> docServiceImpl.findAllDocs(1L));
    }
}